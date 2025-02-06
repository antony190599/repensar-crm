
class DataStore {
    constructor() {
        this.data = {
            users: this.getFromStorage(CONFIG_APP.LOCAL_STORAGE_KEYS.USERS, []),
            templates: this.getFromStorage(CONFIG_APP.LOCAL_STORAGE_KEYS.TEMPLATES, CONFIG_APP.DEFAULT_TEMPLATES.map(t => ({
                ...t,
                id: generateRandomIdentifier("temp")
            }))),
            records: this.getFromStorage(CONFIG_APP.LOCAL_STORAGE_KEYS.RECORDS, [])
        };
    }

    getFromStorage(key, defaultValue) {
        try {
            return JSON.parse(localStorage.getItem(key)) || defaultValue;
        } catch (e) {
            console.error(`Error reading from localStorage: ${e}`);
            return defaultValue;
        }
    }

    saveToStorage() {
        Object.entries(this.data).forEach(([key, value]) => {
            localStorage.setItem(CONFIG_APP.LOCAL_STORAGE_KEYS[key.toUpperCase()], JSON.stringify(value));
        });
    }

    //USERS

    getUsers() {
        return this.data.users;
    }

    getUser(id) {
        return this.data.users.find(u => u.id === id);
    }

    addUser(user) {
        this.data.users.push({ ...user, id: generateRandomIdentifier("user") });
        this.saveToStorage();
    }

    removeUser(id) {
        this.data.users = this.data.users.filter(u => u.id !== id);
        this.saveToStorage();
    }

    editUser(id, newUser) {
        const index = this.data.users.findIndex(u => u.id === id);
        const user = this.data.users[index];
        this.data.users[index] = { ...user, ...newUser };
        this.saveToStorage();
    }

    clearUsers() {
        this.data.users = [];
        this.saveToStorage();
    }

    //TEMPLATES

    getTemplates() {
        return this.data.templates;
    }

    getTemplate(id) {
        return this.data.templates.find(t => t.id === id);
    }

    addTemplate(template) {
        this.data.templates.push({ ...template, id: generateRandomIdentifier("temp") });
        this.saveToStorage();
    }

    removeTemplate(id) {
        this.data.templates = this.data.templates.filter(t => t.id !== id);
        this.saveToStorage();
    }

    editTemplate(id, newTemplate) {
        const index = this.data.templates.findIndex(t => t.id === id);
        const template = this.data.templates[index];
        this.data.templates[index] = { ...template, ...newTemplate };
        this.saveToStorage();
    }

    //REGISTROS

    getRecords() {
        return this.data.records;
    }

    getRecord(id) {
        return this.data.records.find(r => r.id === id);
    }

    addRecord(record) {
        this.data.records.push({ ...record, id: generateRandomIdentifier("req") });
        this.saveToStorage();
    }

    editRecord(id, newRecord) {
        const index = this.data.records.findIndex(r => r.id === id);
        const record = this.data.records[index];
        this.data.records[index] = { ...record, ...newRecord };
        this.saveToStorage();
    }

}