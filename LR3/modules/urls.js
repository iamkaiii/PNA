import {accessToken, myToken, version} from "./consts.js";

class Urls {
    constructor() {
        this.url = 'https://api.vk.com/method'
        this.commonInfo1 = `access_token=${myToken}&v=${version}`
        this.commonInfo = `access_token=${accessToken}&v=${version}`
    }

    getUserInfo(userId) {
        return `${this.url}/users.get?user_ids=${userId}&fields=photo_400_orig, sex&${this.commonInfo}`
    }

    getGroupInfo(id) {
        return `${this.url}/groups.getById?group_ids=${id}&fields=photo_400_orig&${this.commonInfo}`
    }

    getGroupMembers(groupId) {
        return `${this.url}/groups.getMembers?group_id=${groupId}&fields=photo_400_orig&${this.commonInfo}`
    }

    getConversationMembers(peer_id) {
        return `${this.url}/messages.getConversationMembers?peer_id=${peer_id}&fields=photo_400_orig&${this.commonInfo}`
    }

    sendMessage(user_id, message) {
        return `${this.url}/messages.send?user_id=${user_id}&random_id=0&message=${message}&${this.commonInfo}`
    }

    getFriendInfo(userId){
        return `${this.url}/friends.get?user_id=${userId}&fields=sex, photo_400_orig,city&${this.commonInfo1}` 
    }
}

export const urls = new Urls()

