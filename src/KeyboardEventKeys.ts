// All keys were taken from: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values
const specialKeys: string[] = ['Unidentified']
const modifierKeys: string[] = [
  'Alt', 'AltGr', 'Caps Lock', 'Control', 'Hyper', 'Meta', 'NumLock', 'OS',
  'Scroll Lock', 'Scroll', 'ScrollLock', 'Shift', 'Super', 'Symbol', 'Windows',
]
const whitespaceKeys: string[] = ['Enter', 'Tab', ' ']
const navigationKeys: string[] = [
  'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'End', 'Home', 'PageDown', 'PageUp',
]
const editingKeys: string[] = [
  'Backspace', 'Clear', 'Copy', 'CrSel', 'Cut', 'Delete',
  'EraseEof', 'ExSel', 'Insert', 'Paste', 'Redo', 'Undo',
]
const uiKeys: string[] = [
  'Accept', 'Again', 'Attn', 'Cancel', 'ContextMenu', 'Escape', 'Execute', 'Find',
  'Finish', 'Help', 'Pause', 'Play', 'Props', 'Select', 'ZoomIn', 'ZoomOut',
]
const deviceKeys: string[] = [
  'BrightnessDown', 'BrightnessUp', 'Eject', 'LogOff', 'Power',
  'PowerOff', 'PrintScreen', 'Hibernate', 'Standby', 'WakeUp',
]
const compositionKeys: string[] = [
  'AllCandidates', 'Alphanumeric', 'CodeInput', 'Compose', 'Convert',
  'Dead', 'FinalMode', 'GroupFirst', 'GroupLast', 'GroupNext',
  'GroupPrevious', 'ModeChange', 'NextCandidate', 'NonConvert',
  'PreviousCandidate', 'Process', 'SingleCandidate',
]
const koreanCompositionKeys: string[] = ['HangulMode', 'HanjaMode', 'JunjaMode']
const japaneseCompositionKeys: string[] = [
  'Eisu', 'Hankaku', 'Hiragana', 'HiraganaKatakana', 'KanaMode',
  'KanjiMode', 'Katakana', 'Romaji', 'Zenkaku', 'ZenkakuHanaku',
]
const functionKeys: string[] = [
  'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11',
  'F12', 'F13', 'F14', 'F15', 'F16', 'F17', 'F18', 'F19', 'F20',
  'Soft1', 'Soft2', 'Soft3', 'Soft4',
]
const phoneKeys: string[] = [
  'AppSwitch', 'Call', 'Camera', 'CameraFocus', 'EndCall', 'GoBack', 'GoHome',
  'HeadsetHook', 'LastNumberRedial', 'Notification', 'MannerMode', 'VoiceDial',
]
const multimediaKeys: string[] = [
  'ChannelDown', 'ChannelUp', 'MediaFastForward', 'MediaPause',
  'MediaPlay', 'MediaPlayPause', 'MediaRecord', 'MediaRewind',
  'MediaStop', 'MediaTrackNext', 'MediaTrackPrevious',
]
const audioControlKeys: string[] = [
  'AudioBalanceLeft', 'AudioBalanceRight', 'AudioBassDown', 'AudioBassBoostDown',
  'AudioBassBoostToggle', 'AudioBassBoostUp', 'AudioBassUp', 'AudioFaderFront',
  'AudioFaderRear', 'AudioSurroundModeNext', 'AudioTrebleDown', 'AudioTrebleUp',
  'AudioVolumeDown', 'AudioVolumeMute', 'AudioVolumeUp', 'MicrophoneToggle',
  'MicrophoneVolumeDown', 'MicrophoneVolumeMute', 'MicrophoneVolumeUp',
]
const tvControlKeys: string[] = [
  'TV', 'TV3DMode', 'TVAntennaCable', 'TVAudioDescription', 'TVAudioDescriptionMixDown',
  'TVAudioDescriptionMixUp', 'TVContentsMenu', 'TVDataService', 'TVInput', 'TVInputComponent1',
  'TVInputComponent2', 'TVInputComposite1', 'TVInputComposite2', 'TVInputHDMI1', 'TVInputHDMI2',
  'TVInputHDMI3', 'TVInputHDMI4', 'TVInputVGA1', 'TVMediaContext', 'TVNetwork', 'TVNumberEntry',
  'TVPower', 'TVRadioService', 'TVSatellite', 'TVSatelliteBS', 'TVSatelliteCS', 'TVSatelliteToggle',
  'TVTerrestrialAnalog', 'TVTerrestrialDigital', 'TVTimer',
]
const mediaControllerKeys: string[] = [
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
]
const speechRecognitionKeys: string[] = ['SpeechCorrectionList', 'SpeechInputToggle']
const documentKeys: string[] = [
  'Close', 'New', 'Open', 'Print', 'Save', 'SpellCheck', 'MailForward', 'MailReply', 'MailSend',
]
const applicationSelectorKeys: string[] = [
  'LaunchCalculator', 'LaunchCalendar', 'LaunchContacts', 'LaunchMail', 'LaunchMediaPlayer',
  'LaunchMusicPlayer', 'LaunchMyComputer', 'LaunchPhone', 'LaunchScreenSaver',
  'LaunchSpreadsheet', 'LaunchWebBrowser', 'LaunchWebCam', 'LaunchWordProcessor',
  'LaunchApplication1', 'LaunchApplication2', 'LaunchApplication3', 'LaunchApplication4',
  'LaunchApplication5', 'LaunchApplication6', 'LaunchApplication7', 'LaunchApplication8',
  'LaunchApplication9', 'LaunchApplication10', 'LaunchApplication11', 'LaunchApplication12',
  'LaunchApplication13', 'LaunchApplication14', 'LaunchApplication15', 'LaunchApplication16',
]
const browserControlKeys: string[] = [
  'BrowserBack', 'BrowserFavorites', 'BrowserForward', 'BrowserHome',
  'BrowserRefresh', 'BrowserSearch', 'BrowserStop',
]
const numericKeypadKeys: string[] = [
  'Decimal', 'Key11', 'Key12', 'Multiply', 'Add',
  'Clear', 'Divide', 'Subtract', 'Separator',
]

export function isSpecialKey (key: string): boolean {
  return specialKeys.indexOf(key) !== -1
}

export function isModifierKey (key: string): boolean {
  return modifierKeys.indexOf(key) !== -1
}

export function isWhitespaceKey (key: string): boolean {
  return whitespaceKeys.indexOf(key) !== -1
}

export function isNavigationKey (key: string): boolean {
  return navigationKeys.indexOf(key) !== -1
}

export function isEditingKey (key: string): boolean {
  return editingKeys.indexOf(key) !== -1
}

export function isUiKey (key: string): boolean {
  return uiKeys.indexOf(key) !== -1
}

export function isDeviceKey (key: string): boolean {
  return deviceKeys.indexOf(key) !== -1
}

export function isCompositionKey (key: string): boolean {
  return compositionKeys.indexOf(key) !== -1 ||
  koreanCompositionKeys.indexOf(key) !== -1 ||
  japaneseCompositionKeys.indexOf(key) !== -1
}

export function isFunctionKey (key: string): boolean {
  return functionKeys.indexOf(key) !== -1
}

export function isPhoneKey (key: string): boolean {
  return phoneKeys.indexOf(key) !== -1
}

export function isMultimediaKey (key: string): boolean {
  return multimediaKeys.indexOf(key) !== -1
}

export function isAudioControlKey (key: string): boolean {
  return audioControlKeys.indexOf(key) !== -1
}

export function isTvControlKey (key: string): boolean {
  return tvControlKeys.indexOf(key) !== -1
}

export function isMediaControllerKey (key: string): boolean {
  return mediaControllerKeys.indexOf(key) !== -1
}

export function isSpeechRecognitionKey (key: string): boolean {
  return speechRecognitionKeys.indexOf(key) !== -1
}

export function isDocumentKey (key: string): boolean {
  return documentKeys.indexOf(key) !== -1
}

export function isApplicationSelectorKey (key: string): boolean {
  return applicationSelectorKeys.indexOf(key) !== -1
}

export function isBrowserControlKey (key: string): boolean {
  return browserControlKeys.indexOf(key) !== -1
}

export function isNumericKeypadKey (key: string): boolean {
  return numericKeypadKeys.indexOf(key) !== -1
}

export function isGraphemeKey (key: string): boolean {
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
  !isNumericKeypadKey(key)
}
