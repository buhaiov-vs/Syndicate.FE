const Consts = {
    CookieNames: {
        auth: "SyndicateAuth"
    },
    LocalStorageKeys: {    
        userId: "userId"
    },
    ValidationMessages: {
        required: "This field is required",
        email: "Invalid email format"
    },
    Regexs: {
        email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    }
}

export default Consts;