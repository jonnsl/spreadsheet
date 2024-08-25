// All keys were taken from: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values
const specialKeys = ['Unidentified'];
const modifierKeys = [
    'Alt', 'AltGr', 'Caps Lock', 'Control', 'Hyper', 'Meta', 'NumLock', 'OS',
    'Scroll Lock', 'Scroll', 'ScrollLock', 'Shift', 'Super', 'Symbol', 'Windows',
];
const whitespaceKeys = ['Enter', 'Tab', ' '];
const navigationKeys = [
    'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'End', 'Home', 'PageDown', 'PageUp',
];
const editingKeys = [
    'Backspace', 'Clear', 'Copy', 'CrSel', 'Cut', 'Delete',
    'EraseEof', 'ExSel', 'Insert', 'Paste', 'Redo', 'Undo',
];
const uiKeys = [
    'Accept', 'Again', 'Attn', 'Cancel', 'ContextMenu', 'Escape', 'Execute', 'Find',
    'Finish', 'Help', 'Pause', 'Play', 'Props', 'Select', 'ZoomIn', 'ZoomOut',
];
const deviceKeys = [
    'BrightnessDown', 'BrightnessUp', 'Eject', 'LogOff', 'Power',
    'PowerOff', 'PrintScreen', 'Hibernate', 'Standby', 'WakeUp',
];
const compositionKeys = [
    'AllCandidates', 'Alphanumeric', 'CodeInput', 'Compose', 'Convert',
    'Dead', 'FinalMode', 'GroupFirst', 'GroupLast', 'GroupNext',
    'GroupPrevious', 'ModeChange', 'NextCandidate', 'NonConvert',
    'PreviousCandidate', 'Process', 'SingleCandidate',
];
const koreanCompositionKeys = ['HangulMode', 'HanjaMode', 'JunjaMode'];
const japaneseCompositionKeys = [
    'Eisu', 'Hankaku', 'Hiragana', 'HiraganaKatakana', 'KanaMode',
    'KanjiMode', 'Katakana', 'Romaji', 'Zenkaku', 'ZenkakuHanaku',
];
const functionKeys = [
    'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11',
    'F12', 'F13', 'F14', 'F15', 'F16', 'F17', 'F18', 'F19', 'F20',
    'Soft1', 'Soft2', 'Soft3', 'Soft4',
];
const phoneKeys = [
    'AppSwitch', 'Call', 'Camera', 'CameraFocus', 'EndCall', 'GoBack', 'GoHome',
    'HeadsetHook', 'LastNumberRedial', 'Notification', 'MannerMode', 'VoiceDial',
];
const multimediaKeys = [
    'ChannelDown', 'ChannelUp', 'MediaFastForward', 'MediaPause',
    'MediaPlay', 'MediaPlayPause', 'MediaRecord', 'MediaRewind',
    'MediaStop', 'MediaTrackNext', 'MediaTrackPrevious',
];
const audioControlKeys = [
    'AudioBalanceLeft', 'AudioBalanceRight', 'AudioBassDown', 'AudioBassBoostDown',
    'AudioBassBoostToggle', 'AudioBassBoostUp', 'AudioBassUp', 'AudioFaderFront',
    'AudioFaderRear', 'AudioSurroundModeNext', 'AudioTrebleDown', 'AudioTrebleUp',
    'AudioVolumeDown', 'AudioVolumeMute', 'AudioVolumeUp', 'MicrophoneToggle',
    'MicrophoneVolumeDown', 'MicrophoneVolumeMute', 'MicrophoneVolumeUp',
];
const tvControlKeys = [
    'TV', 'TV3DMode', 'TVAntennaCable', 'TVAudioDescription', 'TVAudioDescriptionMixDown',
    'TVAudioDescriptionMixUp', 'TVContentsMenu', 'TVDataService', 'TVInput', 'TVInputComponent1',
    'TVInputComponent2', 'TVInputComposite1', 'TVInputComposite2', 'TVInputHDMI1', 'TVInputHDMI2',
    'TVInputHDMI3', 'TVInputHDMI4', 'TVInputVGA1', 'TVMediaContext', 'TVNetwork', 'TVNumberEntry',
    'TVPower', 'TVRadioService', 'TVSatellite', 'TVSatelliteBS', 'TVSatelliteCS', 'TVSatelliteToggle',
    'TVTerrestrialAnalog', 'TVTerrestrialDigital', 'TVTimer',
];
const mediaControllerKeys = [
    'AVRInput', 'AVRPower', 'ColorF0Red', 'ColorF1Green', 'ColorF2Yellow',
    'ColorF3Blue', 'ColorF4Grey', 'ColorF5Brown', 'ClosedCaptionToggle',
    'Dimmer', 'DisplaySwap', 'DVR', 'Exit', 'FavoriteClear0', 'FavoriteClear1',
    'FavoriteClear2', 'FavoriteClear3', 'FavoriteRecall0', 'FavoriteRecall1',
    'FavoriteRecall2', 'FavoriteRecall3', 'FavoriteStore0', 'FavoriteStore1',
    'FavoriteStore2', 'FavoriteStore3', 'Guide', 'GuideNextDay', 'GuidePreviousDay',
    'Info', 'InstantReplay', 'Link', 'ListProgram', 'LiveContent', 'Lock', 'MediaApps',
    'MediaAudioTrack', 'MediaLast', 'MediaSkipBackward', 'MediaSkipForward',
    'MediaStepBackward', 'MediaStepForward', 'MediaTopMenu', 'NavigateIn', 'NavigateNext',
    'NavigateOut', 'NavigatePrevious', 'NextFavoriteChannel', 'NextUserProfile', 'OnDemand',
    'Pairing', 'PinPDown', 'PinPMove', 'PinPToggle', 'PinPUp', 'PlaySpeedDown', 'PlaySpeedReset',
    'PlaySpeedUp', 'RandomToggle', 'RcLowBattery', 'RecordSpeedNext', 'RfBypass',
    'ScanChannelsToggle', 'ScreenModeNext', 'Settings', 'SplitScreenToggle', 'STBInput',
    'STBPower', 'Subtitle', 'Teletext', 'VideoModeNext', 'Wink', 'ZoomToggle',
];
const speechRecognitionKeys = ['SpeechCorrectionList', 'SpeechInputToggle'];
const documentKeys = [
    'Close', 'New', 'Open', 'Print', 'Save', 'SpellCheck', 'MailForward', 'MailReply', 'MailSend',
];
const applicationSelectorKeys = [
    'LaunchCalculator', 'LaunchCalendar', 'LaunchContacts', 'LaunchMail', 'LaunchMediaPlayer',
    'LaunchMusicPlayer', 'LaunchMyComputer', 'LaunchPhone', 'LaunchScreenSaver',
    'LaunchSpreadsheet', 'LaunchWebBrowser', 'LaunchWebCam', 'LaunchWordProcessor',
    'LaunchApplication1', 'LaunchApplication2', 'LaunchApplication3', 'LaunchApplication4',
    'LaunchApplication5', 'LaunchApplication6', 'LaunchApplication7', 'LaunchApplication8',
    'LaunchApplication9', 'LaunchApplication10', 'LaunchApplication11', 'LaunchApplication12',
    'LaunchApplication13', 'LaunchApplication14', 'LaunchApplication15', 'LaunchApplication16',
];
const browserControlKeys = [
    'BrowserBack', 'BrowserFavorites', 'BrowserForward', 'BrowserHome',
    'BrowserRefresh', 'BrowserSearch', 'BrowserStop',
];
const numericKeypadKeys = [
    'Decimal', 'Key11', 'Key12', 'Multiply', 'Add',
    'Clear', 'Divide', 'Subtract', 'Separator',
];
export function isSpecialKey(key) {
    return specialKeys.indexOf(key) !== -1;
}
export function isModifierKey(key) {
    return modifierKeys.indexOf(key) !== -1;
}
export function isWhitespaceKey(key) {
    return whitespaceKeys.indexOf(key) !== -1;
}
export function isNavigationKey(key) {
    return navigationKeys.indexOf(key) !== -1;
}
export function isEditingKey(key) {
    return editingKeys.indexOf(key) !== -1;
}
export function isUiKey(key) {
    return uiKeys.indexOf(key) !== -1;
}
export function isDeviceKey(key) {
    return deviceKeys.indexOf(key) !== -1;
}
export function isCompositionKey(key) {
    return compositionKeys.indexOf(key) !== -1 ||
        koreanCompositionKeys.indexOf(key) !== -1 ||
        japaneseCompositionKeys.indexOf(key) !== -1;
}
export function isFunctionKey(key) {
    return functionKeys.indexOf(key) !== -1;
}
export function isPhoneKey(key) {
    return phoneKeys.indexOf(key) !== -1;
}
export function isMultimediaKey(key) {
    return multimediaKeys.indexOf(key) !== -1;
}
export function isAudioControlKey(key) {
    return audioControlKeys.indexOf(key) !== -1;
}
export function isTvControlKey(key) {
    return tvControlKeys.indexOf(key) !== -1;
}
export function isMediaControllerKey(key) {
    return mediaControllerKeys.indexOf(key) !== -1;
}
export function isSpeechRecognitionKey(key) {
    return speechRecognitionKeys.indexOf(key) !== -1;
}
export function isDocumentKey(key) {
    return documentKeys.indexOf(key) !== -1;
}
export function isApplicationSelectorKey(key) {
    return applicationSelectorKeys.indexOf(key) !== -1;
}
export function isBrowserControlKey(key) {
    return browserControlKeys.indexOf(key) !== -1;
}
export function isNumericKeypadKey(key) {
    return numericKeypadKeys.indexOf(key) !== -1;
}
export function isGraphemeKey(key) {
    return !isSpecialKey(key) &&
        !isModifierKey(key) &&
        !isWhitespaceKey(key) &&
        !isNavigationKey(key) &&
        !isEditingKey(key) &&
        !isUiKey(key) &&
        !isDeviceKey(key) &&
        !isCompositionKey(key) &&
        !isFunctionKey(key) &&
        !isPhoneKey(key) &&
        !isMultimediaKey(key) &&
        !isAudioControlKey(key) &&
        !isTvControlKey(key) &&
        !isMediaControllerKey(key) &&
        !isSpeechRecognitionKey(key) &&
        !isDocumentKey(key) &&
        !isApplicationSelectorKey(key) &&
        !isBrowserControlKey(key) &&
        !isNumericKeypadKey(key);
}
