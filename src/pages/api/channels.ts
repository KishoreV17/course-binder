import { NextApiRequest, NextApiResponse } from "next";
<<<<<<< HEAD
import { addUserToChannel, createChannel, resetFile, getAllChannels, getAllFiles, getChannelsRolesWithUser, getChannelsWithoutUser, getUserRole, removeUserFromChannel, setNewTemplate, uploadFile, uploadMessage, getPrevmessages } from "~/server/db";
=======
import { addUserToChannel, createChannel, resetFile, getAllChannels, getAllFiles, getChannelsRolesWithUser, getChannelsWithoutUser, getUserRole, removeUserFromChannel, setNewTemplate, uploadFile, notifyChannel } from "~/server/db";
>>>>>>> 2120b520fe73c1fb3eec15d3405e4e8d3e9bf0dc
import { Channel } from "~/types";
import { constructPercentageDict } from "~/utils";

export default async function (req: NextApiRequest, res: NextApiResponse) {
    if(!req.body) {
        res.statusCode = 404
        res.end("Error")
        return
    }

    if(req.body.type == "ALL_CHANNELS") {
        const channels = await getAllChannels();
        res.json(channels);
    } else if (req.body.type == "ADD_USER_TO_CHANNEL") {
        const status = await addUserToChannel(req.body.channel_code, req.body.email, req.body.role);
        res.json(status);
    } else if (req.body.type == "REMOVE_USER_FROM_CHANNEL") {
        const status = await removeUserFromChannel(req.body.channel_code, req.body.email);
        res.json(status);
    } else if (req.body.type =="CREATE_CHANNEL") {
        const status = await createChannel(req.body.data as Channel);
        res.json(status);
    } else if(req.body.type == "CHANNELS_WITH_USER") {
        const { user_channels, channel_roles } = await getChannelsRolesWithUser(req.body.email);
        res.json({ user_channels, channel_roles });
    } else if (req.body.type == "CHANNELS_WITHOUT_USER") {
        const channels = await getChannelsWithoutUser(req.body.email);
        res.json(channels);
    } else if (req.body.type == "ALL_FILES") {
        const files = await getAllFiles(req.body.channel);
        res.json(files);
    } else if (req.body.type == "DELETE_FILE") {
        const status = await resetFile(req.body.fullPath);
        res.json(status);
    } else if (req.body.type == "GET_USER_ROLE") {
        const role = await getUserRole(req.body.channel_code, req.body.user_email);
        res.json(role);
    } else if(req.body.type == "SET_NEW_TEMPLATE") {
        const status = await setNewTemplate(req.body.channel, req.body.new_template);
        res.json(status);
    } else if(req.body.type == "GET_PERCENTAGE_DICT") {
        const percentageDict = await constructPercentageDict(req.body.level, req.body.maxDepth, req.body.dept);
        res.json(percentageDict);
    }
    //anish's part
    else if(req.body.type=="SEND_MESSAGE"){
        const sendMessage=await uploadMessage(req.body.email,req.body.message,req.body.channel);
        res.json(sendMessage);
    }
    else if(req.body.type=="PRINT_MESSAGES"){
        const recieveMessages=await getPrevmessages(req.body.channel);
        res.json(recieveMessages);
    }
    else {
    } else if (req.body.type == "NOTIFY_CHANNEL") {
        const status = await notifyChannel(req.body.channel_code, req.body.message);
        res.json(status);
    } else {
        res.json({
            error: "Invalid request"
        })
    }
}