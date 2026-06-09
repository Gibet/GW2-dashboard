const GW2 = {
    async fetch (url) {
        let response = await fetch(`https://api.guildwars2.com/v2/${url}`)
        let result = await response.json()

        return result
    },
    async account (url) {
        let response = await fetch(`https://api.guildwars2.com/v2/${url}?access_token=${localStorage.getItem('api_key')}`)
        let result = await response.json()

        return result
    },
    async validate (key) {
        let response = await fetch(`https://api.guildwars2.com/v2/account?access_token=${key}`)
        let result = await response.json()

        return result.text !== 'Invalid access token'
    }
}

export default GW2;