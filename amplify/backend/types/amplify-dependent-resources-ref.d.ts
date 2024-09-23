export type AmplifyDependentResourcesAttributes = {
  "api": {
    "stsApi": {
      "ApiId": "string",
      "ApiName": "string",
      "RootUrl": "string"
    },
    "stscontrol": {
      "GraphQLAPIEndpointOutput": "string",
      "GraphQLAPIIdOutput": "string",
      "GraphQLAPIKeyOutput": "string"
    }
  },
  "auth": {
    "stscontrol761ae53b": {
      "AppClientID": "string",
      "AppClientIDWeb": "string",
      "IdentityPoolId": "string",
      "IdentityPoolName": "string",
      "UserPoolArn": "string",
      "UserPoolId": "string",
      "UserPoolName": "string"
    }
  },
  "function": {
    "calcTicket": {
      "Arn": "string",
      "LambdaExecutionRole": "string",
      "LambdaExecutionRoleArn": "string",
      "Name": "string",
      "Region": "string"
    }
  },
  "storage": {
    "s3cf5d94f2": {
      "BucketName": "string",
      "Region": "string"
    }
  }
}