import json
import binascii
import hashlib
import random

class ARC4:
  def __init__(self, key):
    self.S = list(range(256))
    self.key = key
    self.key_setup()

  def key_setup(self):
    key = [c for c in self.key]
    j = 0

    for i in range(256):
      j = (j + self.S[i] + key[i % len(self.key)]) % 256
      self.S[i], self.S[j] = self.S[j], self.S[i]

  def encrypt(self, plaintext):
    i = j = 0
    ciphertext = []

    for char in plaintext:
      i = (i + 1) % 256
      j = (j + self.S[i]) % 256
      self.S[i], self.S[j] = self.S[j], self.S[i]
      keystream_byte = self.S[(self.S[i] + self.S[j]) % 256]
      ciphertext_byte = char ^ keystream_byte
      ciphertext.append(ciphertext_byte)

    return bytes(ciphertext)

  def decrypt(self, ciphertext):
    # Decryption is the same as encryption in ARC4
    return self.encrypt(ciphertext)


def crc16(data):
  crc = 0xFFFF
  for byte in data:
    crc ^= byte
    for _ in range(8):
      if crc & 0x0001:
        crc = (crc >> 1) ^ 0xA001
      else:
        crc >>= 1
  return crc & 0xFFFF

def rc4_encrypt(key, plaintext):
  cipher = ARC4(key)
  ciphertext = cipher.encrypt(plaintext)

  return ciphertext

def rc4_decrypt(key, ciphertext):
  cipher = ARC4(key)
  plaintext = cipher.decrypt(ciphertext)

  return plaintext

def calcTicket(bundle_num, set_num, layout_num, value_num):
  seed = str(random.randint(1, 9))
  key = hashlib.md5(seed.encode()).digest()

  # Normalize the bundle and set numbers
  bundle_num = bundle_num.zfill(5)
  set_num = set_num.zfill(6)
  layout_num = layout_num.zfill(5)
  value_num = value_num.zfill(6)
  md5_hash = hashlib.md5(set_num.encode()).hexdigest()
  input_value = str(int(md5_hash[:5], 16)).zfill(6)[:6]

  # Encrypt set number, input value and bundle number
  message = set_num + input_value + bundle_num
  input_num = int(message)
  input_bytes = input_num.to_bytes(7, 'big')
  ciphertext = rc4_encrypt(key, input_bytes)

  # HCD to decimal output value
  output_value = seed + str(int(binascii.hexlify(
    ciphertext).decode(), 16)).zfill(17)
  pin = str(crc16((input_value + value_num).encode())).zfill(5)

  return [input_value, output_value, pin]

def handler(event, context):
  # Parse the JSON body from the event
  try:
    body = json.loads(event['body'])
  except json.JSONDecodeError as e:
    return {
      'statusCode': 400,
      'body': json.dumps({'error': 'Invalid JSON in the request body'})
    }

  # Access keys from the body
  bundle = body.get('bundle')
  set = body.get('set')
  layout = body.get('layout')
  value = body.get('value')

  [input_value, output_value, pin] = calcTicket(bundle, set, layout, value)

  return {
    'statusCode': 200,
    'headers': {
      'Access-Control-Allow-Headers': '*',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
    },
    'body': json.dumps({
      'input_value': input_value,
      'output_value': output_value,
      'pin': pin
    })
  }