import { CognitoIdentityServiceProvider, config } from "aws-sdk";
import { listDevices, devicesByDate, listOrders, ordersByDate, listSets } from '../graphql/queries'
import { createDevice, deleteDevice,
  createOrder,updateOrder, deleteOrder,
  createSet, updateSet } from '../graphql/mutations'
import { API, graphqlOperation, Storage } from 'aws-amplify'
import toast from 'react-hot-toast';
import Papa from 'papaparse';
import fileDownload from 'js-file-download';

config.update({
  region: process.env.REACT_APP_AWS_REGION,
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
});
const cognitoIdentityServiceProvider = new CognitoIdentityServiceProvider();

export const COUNT_PER_PAGE = process.env.REACT_APP_ITEM_COUNT_PER_PAGE;

const beginWait = () => document.body.style.cursor = 'wait';
const endWait = () => document.body.style.cursor = 'auto';

const getPageNum = (list) => {
  let count = list.length;
  if (count >  0)
    count = Math.floor((count - 1) / COUNT_PER_PAGE) + 1;
  return count;
}

export const getUserEmail = (user) => {
  return user.hasOwnProperty('Attributes') ?
    user.Attributes.find(attr => attr.Name === 'email').Value:
    user.UserAttributes.find(attr => attr.Name === 'email').Value;
}

export const getLocaleDate = (date) => {
  const date_ = new Date(date);
  const options = { month: 'long', day: 'numeric', year: 'numeric' };
  return date_.toLocaleDateString(undefined, options) +
    ' ' + date_.toLocaleTimeString();
}

export async function searchUsers(searchField, setPageNum, setFiltered) {
  beginWait();

  try {
    const condition = 'email^="' + searchField + '"';
    const userList = await cognitoIdentityServiceProvider.listUsers({
      Filter: condition,
      UserPoolId: process.env.REACT_APP_AWS_USER_POOL_ID,
    }).promise();
    const filtered = userList.Users.map((user) => {
      return {...user, checked: false};
    });
    setPageNum(getPageNum(filtered));
    setFiltered(filtered);
  } catch (err) {
    toast.error('An error occurred while fetching users.');
  }

  endWait();
}

export async function searchUsersInGroup(groupName, searchField, setPageNum, setFiltered) {
  beginWait();

  try {
    const userList = await cognitoIdentityServiceProvider.listUsersInGroup({
      GroupName: groupName,
      UserPoolId: process.env.REACT_APP_AWS_USER_POOL_ID,
    }).promise();
    let filtered = userList.Users.filter(item => getUserEmail(item).includes(searchField));
    filtered = filtered.map((user) => {
      return {...user, checked: false};
    });
    setPageNum(getPageNum(filtered));
    setFiltered(filtered);
  } catch (err) {
    toast.error('An error occurred while fetching users.');
  }

  endWait();
}

export async function searchUsersForDevice(devId, searchField, setPageNum, setFiltered) {
  beginWait();

  try {
    const condition = {
      filter: {
        uid: { eq: devId },
        not: { user: {eq: ""} }
      },
      type: 'Device',
      sortDirection: 'DESC',
    }
    const deviceData = await API.graphql(graphqlOperation(devicesByDate, condition));
    const devices = deviceData.data.devicesByDate.items;
    
    let users = [];
    const promises = devices.map(async device => {
      users.push(await cognitoIdentityServiceProvider.adminGetUser({
        UserPoolId: process.env.REACT_APP_AWS_USER_POOL_ID,
        Username: device.user
      }).promise());
    })
    await Promise.all(promises);

    users = users.filter(user =>
      getUserEmail(user).includes(searchField));

    // Sort by created date
    users.sort((a, b) =>
      new Date(b.UserCreateDate) - new Date(a.UserCreateDate));

    // Add checked attribute
    users = users.map(user => {
      return { ...user, checked: false };
    });

    setPageNum(getPageNum(users));
    setFiltered(users);
  } catch (err) {
    toast.error('An error occurred while fetching users.');
  }
  endWait();
}

export async function getUsersForDevice(devId, setUsers) {
  beginWait();

  const condition = {
    filter: {
      uid: { eq: devId },
      not: { user: {eq: ""} }
    },
    type: 'Device',
    sortDirection: 'DESC',
  }
  try {
    const deviceData = await API.graphql(graphqlOperation(devicesByDate, condition));
    const usersForDevice = deviceData.data.devicesByDate.items.map(device => device.user);
    console.log(usersForDevice);

    const userList = await cognitoIdentityServiceProvider.listUsers({
      UserPoolId: process.env.REACT_APP_AWS_USER_POOL_ID,
    }).promise();
    let users = userList.Users.map(user => getUserEmail(user));
    users = users.filter(user => !usersForDevice.includes(user));
    setUsers(users);
  } catch (err) {
    toast.error('An error occurred while fetching users.');
  }

  endWait();
}

export async function addUsersForDevice(devId, users, refresh) {
  beginWait();

  const promises = users.map(async user => {
    try {
      await API.graphql(graphqlOperation(createDevice,
        {input: {uid: devId, user: user, type: 'Device'}}));
      console.log('Successfully added user!');
    } catch (err) {
      console.log('Error adding user:', err);
    }
  })
  try {
    await Promise.all(promises);
    toast.success('Users have been added successfully.');
  } catch (err) {
    toast.error('An error occurred while adding users.');
  }

  refresh(true);
  endWait();
}

export async function removeUsersForDevice(devId, users, post) {
  beginWait();

  const promises = users.map(async (user) => {
    if (user.checked) {
      try {
        let condition = {
          filter: {
            uid: {eq: devId},
            user: {eq: user.Username}
          },
        }
        let deviceData = await API.graphql(graphqlOperation(listDevices, condition));
        const id = deviceData.data.listDevices.items[0].id;
        await API.graphql(graphqlOperation(deleteDevice, {input: {id: id}}));
        console.log(`User ${user.Username} has been removed successfully.`);
      } catch (err) {
        console.log('Error removing user:', err);
      }
    }
  })

  try {
    await Promise.all(promises);
    toast.success('Users have been removed successfully.');
  } catch (err) {
    toast.error('An error occurred while removing users.');
  }

  post();
  endWait();
}

export async function createUser(email, password, refresh) {
  beginWait();
  
  const params = {
    UserPoolId: process.env.REACT_APP_AWS_USER_POOL_ID,
    Username: email,
    TemporaryPassword: password,
    DesiredDeliveryMediums: ['EMAIL'],
  }

  cognitoIdentityServiceProvider.adminCreateUser(params, function(err, data) {
    if (err)
      toast.error('An error occurred while creating user.');
    else
      toast.success('User has been created successfully.');
    refresh(true);
    endWait();
  });
}

// Delete the devices for user
export async function removeDevicesForUsers(users) {
  let ids = [];
  var promises = users.map(async user => {
    try {
      let condition = {
        filter: {
          user: {eq: user},
        },
      }
      let deviceData = await API.graphql(graphqlOperation(listDevices, condition));
      ids.push(deviceData.data.listDevices.items.map(device => device.id));
    } catch (err) {
      console.log('Error fetching device id:', err);
    }
  });
  try {
    await Promise.all(promises);
    ids = ids.flat();
    promises = ids.map(async (id) => {
      try {
        await API.graphql(graphqlOperation(deleteDevice, {input: {id: id}}));
      } catch (err) {
        console.log(`Error deleting device ${id}:`, err);
      }
    });
    await Promise.all(promises);
    console.log('All devices for user have been deleted successfully.');
  } catch (err) {
    console.log('An error occurred while deleting the devices.', err);
  }
}

export async function deleteUser(userName, post) {
  beginWait();

  // Remove the devices for this user
  removeDevicesForUsers([userName]);

  cognitoIdentityServiceProvider.adminDeleteUser({
    UserPoolId: process.env.REACT_APP_AWS_USER_POOL_ID,
    Username: userName
  }, function(err, data) {
    if (err) {
      toast.error('An error occurred while deleting user.');
    } else {
      toast.success('User has been deleted successfully.');
      post();
    }
    endWait();
  });
}

export async function deleteUsers(items, post) {
  beginWait();

  // Remove the devices for users
  removeDevicesForUsers(items.map(item => item.Username));

  // Delete all users from user pool
  const promises = items.map(async (item) => {
    if (item.checked) {
      const params = {
        UserPoolId: process.env.REACT_APP_AWS_USER_POOL_ID,
        Username: item.Username,
      };

      try {
        await cognitoIdentityServiceProvider.adminDeleteUser(params).promise();
        console.log(`User ${item.Username} has been deleted successfully.`);
      } catch (err) {
        console.log(`Error deleting user ${item.Username}:`, err);
      }
    }
  });

  try {
    await Promise.all(promises);
    toast.success('Users have been deleted successfully.');
  } catch (err) {
    toast.error('An error occurred while deleting users.');
  }

  post();
  endWait();
}

export async function deleteUsersInGroup(groupName, items, post) {
  beginWait();

  // Delete all users in this group from user pool
  const promises = items.map(async (item) => {
    if (item.checked) {
      const params = {
        GroupName: groupName,
        UserPoolId: process.env.REACT_APP_AWS_USER_POOL_ID,
        Username: item.Username,
      };

      try {
        await cognitoIdentityServiceProvider.adminRemoveUserFromGroup(params).promise();
        console.log(`User ${item.Username} has been deleted successfully.`);
      } catch (err) {
        console.log(`Error deleting user ${item.Username}:`, err);
      }
    }
  });

  try {
    await Promise.all(promises);
    toast.success('Users have been deleted from the group successfully.');
  } catch (err) {
    toast.error('An error occurred while deleting users from the group.');
  }
  post();
  
  endWait();
}

export async function getUsersForGroup(groupName, setUsers) {
  beginWait();

  try {
    let userList = await cognitoIdentityServiceProvider.listUsersInGroup({
      GroupName: groupName,
      UserPoolId: process.env.REACT_APP_AWS_USER_POOL_ID,
    }).promise();
    let usersInGroup = userList.Users.map(user => getUserEmail(user));

    userList = await cognitoIdentityServiceProvider.listUsers({
      UserPoolId: process.env.REACT_APP_AWS_USER_POOL_ID,
    }).promise();
    let allUsers = userList.Users.map(user => getUserEmail(user));

    setUsers(allUsers.filter(user => !usersInGroup.includes(user)));
  } catch (err) {
    toast.error('An error occurred while fetching users.');
  }

  endWait();
}

export async function addUsersForGroup(groupName, users, refresh) {
  beginWait();

  users.map(user => {
    cognitoIdentityServiceProvider.adminAddUserToGroup({
      UserPoolId: process.env.REACT_APP_AWS_USER_POOL_ID,
      Username: user,
      GroupName: groupName
    }, function (err, data) {
      if (err) {
        toast.error('An error occurred while adding users to the group.');
      } else {
        toast.success('Users have been added to the group successfully.');
        refresh(true);
        endWait();
      }
    })
  });
}

export async function getUserInfo(userName, setEmail, setStatus) {
  beginWait();

  cognitoIdentityServiceProvider.adminGetUser({
      UserPoolId: process.env.REACT_APP_AWS_USER_POOL_ID,
      Username: userName
    }, function (err, user) {
      if (err) {
        toast.error('An error occurred while fetching user information.')
      } else {
        setEmail(getUserEmail(user));
        setStatus(user.UserStatus);
      }
      endWait();
    }
  )
}

export async function addUserToGroup(userName, group, post) {
  beginWait();
  
  cognitoIdentityServiceProvider.adminAddUserToGroup({
    UserPoolId: process.env.REACT_APP_AWS_USER_POOL_ID,
    Username: userName,
    GroupName: group
  }, function (err, data) {
    if (err) {
      toast.error('An error occurred while adding user to the group.');
    } else {
      post();
    }
    endWait();
  })
}

export async function removeUserFromGroup(userName, group, refresh) {
  beginWait();

  cognitoIdentityServiceProvider.adminRemoveUserFromGroup({
    UserPoolId: process.env.REACT_APP_AWS_USER_POOL_ID,
    GroupName: group,
    Username: userName
  }, function (err, data) {
    if (err) {
      toast.error('An error occurred while removing user from the group.');
    } else {
      refresh();
    }
    endWait();
  })
}

export async function getGroups(userName, setEmail, setUserGroups, setGroups) {
  beginWait();

  cognitoIdentityServiceProvider.adminGetUser({
    UserPoolId: process.env.REACT_APP_AWS_USER_POOL_ID,
    Username: userName
  }, function(err, user) {
    if (err) {
      console.log('Error fetching groups:', err);
    } else {
      setEmail(getUserEmail(user));
    }
  });

  let userGroups = null;
  cognitoIdentityServiceProvider.adminListGroupsForUser({
    UserPoolId: process.env.REACT_APP_AWS_USER_POOL_ID,
    Username: userName
  }, function (err, data) {
    if (err) {
      console.log('Error fetching groups for user:', err);
    } else {
      userGroups = data.Groups.map(group => group.GroupName);
      setUserGroups(userGroups);

      cognitoIdentityServiceProvider.listGroups({
        UserPoolId: process.env.REACT_APP_AWS_USER_POOL_ID,
      }, function(err, data) {
        if (err) {
          toast.error('An error occurred while fetching the groups.');
        } else {
          const allGroups = data.Groups.map(group => group.GroupName);
          setGroups(allGroups.filter(item => !userGroups.includes(item)));
        }}
      )
    }
    endWait();
  })
}

export async function createGroup(groupName, refresh) {
  beginWait();

  const params = {
    UserPoolId: process.env.REACT_APP_AWS_USER_POOL_ID,
    GroupName: groupName
  }
  await cognitoIdentityServiceProvider.createGroup(params, function(err, data) {
    if (err)
      toast.error('An error occurred while creating the group.');
    else
      toast.success('The group has been created successfully.');
    refresh(true);
    endWait();
  })
}

export async function deleteGroups(items, post) {
  beginWait();

  // Delete all users from user pool
  const promises = items.map(async (item) => {
    if (item.checked) {
      const groupName = item.GroupName;
      const params = {
        UserPoolId: process.env.REACT_APP_AWS_USER_POOL_ID,
        GroupName: groupName
      }
      try {
        await cognitoIdentityServiceProvider.deleteGroup(params).promise();
        console.log(`User ${groupName} has been deleted successfully.`);
      } catch (err) {
        console.log(`Error deleting user ${groupName}:`, err);
      }
    }
  })
  try {
    await Promise.all(promises);
    toast.success('The groups have been deleted successfully.');
  } catch (err) {
    toast.error('An error occurred while deleting the groups.');
  }
  post();
  
  endWait();
}

export async function searchGroups(searchField, setPageNum, setFiltered) {
  beginWait();

  try {
    const groupList = await cognitoIdentityServiceProvider.listGroups({
      UserPoolId: process.env.REACT_APP_AWS_USER_POOL_ID,
    }).promise();
    const groups = groupList.Groups;
    let filtered = groups.filter(item => item.GroupName.includes(searchField));
    setPageNum(getPageNum(filtered));
    setFiltered(filtered);
  } catch (err) {
    toast.error('An error occurred while fetching the groups.');
  }

  endWait();
}

export async function searchDevices(searchField, userName, setPageNum, setFiltered) {
  beginWait();

  try {
    const condition = {
      filter: {
        uid: {
          contains: searchField
        },
        user: {
          eq: userName
        }
      },
      type: 'Device',
      sortDirection: 'DESC',
    }
    const deviceData = await API.graphql(graphqlOperation(devicesByDate, condition));
    let filtered = deviceData.data.devicesByDate.items.map((device) => {
      return {...device, checked: false};
    });
    setPageNum(getPageNum(filtered));
    setFiltered(filtered);
  } catch (err) {
    toast.error('An error occurred while fetching the devices.');
  }

  endWait();
}

export async function addDevice(uid, refresh) {
  beginWait();

  // const params = {
  //   thingName: uid,
  // }

  // try {
  //   iot.createThing(params, function (err, data) {
  //     if (err) {
  //       console.log('Error creating thing:', err);
  //     } else {
  //       console.log('Successfully created thing:', data);
  //     }
  //   });
  // } catch (err) {
  //   console.log(err);
  // }

  try {
    await API.graphql(graphqlOperation(createDevice, {input: {uid: uid, user: '', type: 'Device'}}));
    toast.success('The device has been added successfully.');
  } catch (err) {
    toast.error('An error occurred while adding the device.');
  }
  refresh(true);

  endWait();
}

export async function addDevicesForUser(userName, devices, refresh) {
  beginWait();

  const promises = devices.map(async device => {
    try {
      await API.graphql(graphqlOperation(createDevice,
        {input: {uid: device, user: userName, type: 'Device'}}));
      console.log('Successfully added device!');
    } catch (err) {
      console.log('Error adding device:', err);
    }
  })
  try {
    await Promise.all(promises);
    toast.success('The devices have been added successfully.');
  } catch (err) {
    toast.error('An error occurred while adding the devices.');
  }

  refresh(true);
  endWait();
}

export async function deleteDevices(items, post) {
  beginWait();

  let ids = [];
  let promises = items.map(async (item) => {
    if (item.checked) {
      try {
        let condition = {
          filter: {
            uid: {eq: item.uid},
          },
        }
        let deviceData = await API.graphql(graphqlOperation(listDevices, condition));
        ids.push(deviceData.data.listDevices.items.map(device => device.id));
      } catch (err) {
        console.log('Error fetching device id:', err);
      }
    }
  });
  
  try {
    await Promise.all(promises);
    ids = ids.flat();
    console.log(ids);
    promises = ids.map(async (id) => {
      try {
        await API.graphql(graphqlOperation(deleteDevice, {input: {id: id}}));
      } catch (err) {
        console.log(`Error deleting device ${id}:`, err);
      }
    });
    await Promise.all(promises);
    toast.success('The devices have been deleted successfully.');
  } catch (err) {
    toast.error('An error occurred while deleting the devices.');
  }
  
  post();
  endWait();
}

export async function getDevicesForUser(userName, setDevices) {
  beginWait();

  try {
    let condition = {
      filter: { user: {eq: userName} },
      type: 'Device',
      sortDirection: 'DESC',
    }
    let deviceData = await API.graphql(graphqlOperation(devicesByDate, condition));
    const userDevices = deviceData.data.devicesByDate.items.map(device => device.uid);
    
    condition = {
      filter: { user: { eq: '' } },
      type: 'Device',
      sortDirection: 'DESC',
    }
    deviceData = await API.graphql(graphqlOperation(devicesByDate, condition));
    const allDevices = deviceData.data.devicesByDate.items.map(device => device.uid);
    setDevices(allDevices.filter(device => !userDevices.includes(device)));
    endWait();
  } catch (err) {
    toast.error('An error occurred while fetching the devices for user.');
  }
}

export const parseFile = async (file) => {
  beginWait();

  var parsedData = null;
  try {
    const fileKey = `uploads/${file.name}`;
    await Storage.put(fileKey, file);

    // Read the uploaded CSV file
    const url = await Storage.get(fileKey);
    const response = await fetch(url);
    const csvData = await response.text();

    // Parse the CSV data using papaparse
    parsedData = Papa.parse(csvData, { header: false });
  } catch (err) {
    toast.error('Error uploading or parsing CSV file.');
  }

  endWait();

  return parsedData;
}

export const addOrders = async (orders) => {
  const promises = orders.map(async (order) => {
    if (order.length === 3) {
      try {
        await API.graphql(graphqlOperation(createOrder, {
          input: {
            bundle: order[0],
            layout: order[1],
            value: order[2],
            set: '',
            status: '',
            type: 'Order'
          }
        }));
        console.log('Successfully added user!');
      } catch (err) {
        console.log('Error adding an order:', err);
      }
    }
  });
  try {
    await Promise.all(promises);
    toast.success('Orders have been added successfully.');
  } catch (err) {
    toast.error('An error occurred while adding orders.');
  }
}

export async function searchOrders(searchField, setPageNum, setFiltered) {
  beginWait();

  try {
    const condition = {
      filter: {
        bundle: {
          contains: searchField
        }
      },
      type: "Order",
      sortDirection: 'DESC',
    }
    const orders = await API.graphql(graphqlOperation(ordersByDate, condition));
    let filtered = orders.data.ordersByDate.items.map((order) => {
      return {...order, checked: false};
    });
    setPageNum(getPageNum(filtered));
    setFiltered(filtered);
  } catch (err) {
    toast.error('An error occurred while fetching the orders.');
  }

  endWait();
}

export const deleteOrders = async (items, post) => {
  beginWait();

  let ids = [];
  let promises = items.map(async (item) => {
    if (item.checked) {
      try {
        let condition = {
          filter: {
            id: { eq: item.id }
          }
        }
        let list = await API.graphql(graphqlOperation(listOrders, condition));
        ids.push(list.data.listOrders.items.map(order => order.id));
      } catch (err) {
        console.error('Error fetching order id:', err);
      }
    }
  });
  
  try {
    await Promise.all(promises);
    ids = ids.flat();
    promises = ids.map(async (id) => {
      try {
        await API.graphql(graphqlOperation(deleteOrder, {input: { id: id }}));
      } catch (err) {
        console.error(`Error deleting order ${id}:`, err);
      }
    });
    await Promise.all(promises);
    toast.success('The orders have been deleted successfully.');
  } catch (err) {
    toast.error('An error occurred while deleting the devices.');
  }
  
  post();
  endWait();
}

export const orderTickets = async (bundle, quantity, post) => {
  beginWait();

  quantity = Number(quantity);
  if (!quantity) {
    toast.error('Please specify quantity.');
    endWait();
    return;
  }

  // Fetch the bundle order
  var orderItem = null;
  try {
    let list = await API.graphql(graphqlOperation(listOrders, {
      filter: {
        bundle: { eq: bundle },
        status: { eq: '' },
      }
    }));
    orderItem = list.data.listOrders.items[0];
  } catch (err) {
    console.error(err);
  }

  // Order tickets
  if (orderItem != null) {
    // Fetch the latest Set number
    var setItem = null;
    try {
      let list = await API.graphql(graphqlOperation(listSets));
      setItem = list.data.listSets.items[0];
    } catch {}
    if (setItem == null) {
      setItem = {
        id: null,
        set: process.env.REACT_APP_SET_VALUE
      };
    }

    // Push all promises that calculate the ticket number
    const promises = [];
    for (let set = setItem.set; set < setItem.set + quantity; set++) {
      promises.push(calcTicket(bundle, set.toString(), orderItem.layout, orderItem.value));
    }
    try {
      await Promise.all(promises);
      
      // Remove the origianl order
      await API.graphql(graphqlOperation(deleteOrder,
        { input: { id: orderItem.id } }));
      toast.success('Tickets have been ordered successfully.');
    } catch (err) {
      toast.error('An error occurred while ordering tickets.');
    }

    // Update set table
    if (setItem.id != null) {
      await API.graphql(graphqlOperation(updateSet, {
        input: { id: setItem.id, set: setItem.set + quantity }
      }));
    } else {
      await API.graphql(graphqlOperation(createSet, {
        input: { set: setItem.set + quantity }
      }));
    }
    post("Order", true);
  } else {
    toast.error('No orders.');
  }

  endWait();
}

export const calcTicket = async (bundle, set, layout, value) => {
  try {
    const response = await API.post('stsApi', '/calcTicket', {
      body: {
        bundle: bundle,
        set: set,
        layout: layout,
        value: value
      }}
    );
    
    //Mark 'ORDERED'
    await API.graphql(graphqlOperation(createOrder, {
      input: {
        bundle: bundle,
        set: set,
        layout: layout,
        seed: response.input_value,
        value: value,
        ticket: response.output_value,
        pin: response.pin,
        status: 'ORDERED',
        type: 'Order'
      }
    }));
  } catch (err) {
    console.error(err);
  }
}

export const issueTickets = async (bundle, devId, post) => {
  beginWait();

  // Fetch the bundle orders
  var orders = null;
  try {
    let list = await API.graphql(graphqlOperation(listOrders, {
      filter: {
        bundle: { eq: bundle },
        status: { eq: 'ORDERED' },
      }
    }));
    orders = list.data.listOrders.items;
  } catch {}

  if (orders != null || orders.Length) {
    const promises = orders.map(async (order) => {
      const set = order.set.padStart(6, '0');
      const seed = order.seed;
      const bundle = order.bundle.padStart(5, '0');
      //const layout = order.layout.padStart(5, '0');
      const value = order.value.padStart(6, '0');
      const ticket = order.ticket;
      const pin = order.pin;

      const val_file = `0${bundle}_${set}.val`;
      const out_file = `0${bundle}_${set}_TICKET.csv`;
      const res_file = `0${bundle}_${set}_RESULT.csv`;

      const val_content = `${set},${seed},${bundle},${value}`;
      const out_content = `${ticket},${pin}`;
      const res_content = `${set},${seed},${bundle}`;

      // await Storage.put(val_key, val_content, { contentType: 'text/plain' });
      // await Storage.put(out_key, out_content, { contentType: 'text/plain' });
      // await Storage.put(res_key, res_content, { contentType: 'text/plain' });

      fileDownload(val_content, val_file);
      fileDownload(out_content, out_file);
      fileDownload(res_content, res_file);
      
      await API.graphql(graphqlOperation(updateOrder, {
        input: { id: order.id, status: 'ISSUED' }
      }));
    });
    // Issue all tickets
    try {
      await Promise.all(promises);
      toast.success('Tickets have been issued successfully.');
    } catch (err) {
      toast.error('An error occurred while issuing tickets.');
    }
    post("Issue", true);
  } else {
    toast.error('No orders.');
  }

  endWait();
}