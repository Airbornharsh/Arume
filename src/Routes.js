const express = require("express");
const Joining = require("./controllers/Community/Joining");
const MessageDelete = require("./controllers/Message/MessageDelete");
const MessageGet = require("./controllers/Message/MessageGet");
const MessagePost = require("./controllers/Message/MessagePost");
const MessagePut = require("./controllers/Message/MessagePut");
const Authentication = require("./middleware/Authentication");
const Router = express.Router();

//Community
Router.post("/community", Joining);
Router.post("/message", Authentication, MessagePost);
Router.get("/message", Authentication, MessageGet);
Router.put("/message/:id", Authentication, MessagePut);
Router.delete("/message/:id", Authentication, MessageDelete);

module.exports = Router;
