 interface ConfigValues {
    bot: {
        botToken: string,
        selfToken: string
    }
    guild: {
        ID: string,
        vanityURL: string
    }

}

const config: ConfigValues = {
    bot: {
        botToken: '',
        selfToken: ''
    },
    guild: {
        ID: '',
        vanityURL: ''
    }
}

export default config;