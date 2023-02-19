/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
const AWS = require("aws-sdk");
const documentClient = new AWS.DynamoDB.DocumentClient();

const env = process.env.ENV;
const AppsyncID = process.env.API_INSTAGRAMCLONE_GRAPHQLAPIIDOUTPUT;
const TableName = `User-${AppsyncID}-${env}`;

const userExists = async (id) => {
  const params = {
    TableName,
    Key: id,
  };
  try {
    const response = await documentClient.get(params).promise();
    return !!response?.Item;
  } catch (error) {
    return false;
  }
};
const saveUser = async (user) => {
  const date = new Date();
  const dateStr = date.toISOString();
  const timestamp = date.getTime();

  const Item = {
    ...user,
    __typename: "User",
    createdAt: dateStr,
    updatedAt: dateStr,
    _lastChangedAt: timestamp,
    _version: 1,
  };
  const params = {
    TableName,
    Item,
  };

  try {
    await documentClient.put(params).promise();
    return !!response;
  } catch (error) {
    console.log(error);
  }
};

exports.handler = async (event, context) => {
  console.log("Lamdba here");
  console.log(event);
  if (!event?.request?.userAttributes) {
    console.log("No user!");
    return;
  }
  const userAttributes = event.request.userAttributes;
  const newUser = {
    id: userAttributes?.sub,
    owner: userAttributes.sub,
    name: userAttributes?.name,
    email: userAttributes?.email,
    nofPosts: 0,
    nofFollowers: 0,
    nofFollowings: 0,
  };
  const isExist = await userExists(newUser.id);
  if (!isExist) {
    console.log("user Exist");
    await saveUser(newUser);
  } else {
    console.log("user not Exist!");
  }
  // insert code to be executed by your lambda trigger
  return event;
};
