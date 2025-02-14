import { ref, watch } from "vue";

interface SettingsMap{
 general : IGeneralSettings,
 notifications : INotificationsSettings,
 privacy: IPrivacySettings
};

type SettingsKey = keyof SettingsMap

interface IGeneralSettings {
    username: string;
    email: string;
    about: string;
    gender: string;
    country: string;
}


const init = <T extends SettingsKey>(key:T, defaults: SettingsMap[T]) => {
    const stored = localStorage.getItem(key);

    return stored !== null ?
        JSON.parse(stored) :
        defaults

};

//IIFE immediately invoked function expression
const general = ref<IGeneralSettings>(
    init("general",{
        username: '',
        email: '',
        about: '',
        gender: 'male',
        country: 'USA'
    })
);

const watcher = <T extends SettingsKey>(key : T)=>(value: SettingsMap[T])=>
{
    localStorage.setItem(key, JSON.stringify(value));
}

watch(general,watcher('general') ,{ deep: true });

interface INotificationsSettings {
    email: boolean;
    sms: boolean;
}

const notifications = ref<INotificationsSettings>(
    init('notifications',{
        email: false,
        sms: false
    })
);

watch(notifications,watcher('notifications') ,{ deep: true })

interface IPrivacySettings {
    visibility: string;
    searchEngineIndexing: boolean;
}

type Visibility = 'public' | 'private';

const privacy = ref<IPrivacySettings>(
    init('privacy',
        {
            visibility: 'public',
            searchEngineIndexing: false
        }
    )
);

watch(privacy,watcher('privacy') ,{ deep: true });

export function useSettings() {
    return {
        general,
        notifications,
        privacy

    };
}