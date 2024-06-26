module.exports.config = {
    name: "impostor",
    version: "1.0.9",
    hasPermssion: 2,
    credits: "ericson",
    description: "Randomly kicks a member",
    usePrefix: true,
    commandCategory: "Moderation",
    usages: [],
    cooldowns: 5
};

module.exports.run = async ({ api, event }) => {
    const threadInfo = await api.getThreadInfo(event.threadID);
    const members = threadInfo.participantIDs.filter(id => id !== api.getCurrentUserID());

    if (members.length === 0) {
        api.sendMessage("No members other than the bot found!", event.threadID);
        return;
    }

    const randomIndex = Math.floor(Math.random() * members.length);
    const memberID = members[randomIndex];

    try {
        await api.removeUserFromGroup(memberID, event.threadID);
        api.sendMessage(`Member ${memberID} has been kicked!`, event.threadID);
    } catch (error) {
        api.sendMessage(`Failed to kick member ${memberID}. Error: ${error}`, event.threadID);
    }
};
