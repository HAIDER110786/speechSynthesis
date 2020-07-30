const languageOptions = document.querySelector('[name=languageOptions]');
const speakingOptions = document.querySelectorAll('[type=range]');
const textArea = document.querySelector('[name=text]');
const speakButton = document.querySelector('.buttons').children[0];
const stopButton = document.querySelector('.buttons').children[1];
const TTS = new SpeechSynthesisUtterance();
TTS.text = textArea.value;
let voices;

speechSynthesis.addEventListener('voiceschanged',populateDropDown);

function populateDropDown(){
    voices = this.getVoices();
    languageOptions.innerHTML = voices
    .map(voice=>{
        let temp = voice.name.replace(/\s/g, '');
        return `<option value=${temp}>${voice.name}(${voice.lang})</option>`
    })
    .join('');
}

speakingOptions.forEach(speakingOption => 
    speakingOption.addEventListener('change',makeSpeakingChanges)
);

function makeSpeakingChanges() {
    TTS[this.name] = this.value;
    restart();
}

speakButton.addEventListener('click',speak);
stopButton.addEventListener('click',shutup);

function shutup() {
    speechSynthesis.cancel();
}

function speak(){
    if(atleastOneLetter(textArea.value)){
        TTS.text = textArea.value;
        TTS.voice = voices.find(voice => voice.name.replace(/\s/g, '') === languageOptions.value.replace(/\s/g, ''));
        speechSynthesis.speak(TTS); 
    }
}

languageOptions.addEventListener('change',restart)

function restart() {
    shutup();
    speak();
}

function atleastOneLetter(text){
    for(let i=65;i<=90;i++){
        if(text.includes(String.fromCharCode(i))){
            return true;
        } 
    }
    for(let i=97;i<=122;i++){
        if(text.includes(String.fromCharCode(i))){
            return true;
        } 
    }
    return false;
}

window.addEventListener('unload',shutup);