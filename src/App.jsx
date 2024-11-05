import { useState, useEffect } from 'react'
import './App.css'
import React from 'react'

const audioClips =  [
  {
  keyCode: 81,
  key: "Q",
  id: "Heater-1",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3"
}, 
  {
  keyCode: 87,
  key: "W",
  id: "Heater-2",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3"
}, 
  {
  keyCode: 69,
  key: "E",
  id: "Heater-3",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3"
}, 
  {
  keyCode: 65,
  key: "A",
  id: "Heater-4",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3"
}, 
  {
  keyCode: 83,
  key: "S",
  id: "Clap",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3"
}, 
  {
  keyCode: 68,
  key: "D",
  id: "Open-HH",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3"
}, 
  {
  keyCode: 90,
  key: "Z",
  id: "Kick-n'-Hat",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3"
}, 
  {
  keyCode: 88,
  key: "X",
  id: "Kick",
  url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3"
},  
  {
  keyCode: 67,
  key: "C",
  id: "Closed-HH",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3"
}];

const audioClips2 = [{
  keyCode: 81,
  key: "Q",
  id: "Chord-1",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3"
}, 
  {
  keyCode: 87,
  key: "W",
  id: "Chord-2",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3"
}, 
  {
  keyCode: 69,
  key: "E",
  id: "Chord-3",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3"
}, 
  {
  keyCode: 65,
  key: "A",
  id: "Shaker",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3"
}, 
  {
  keyCode: 83,
  key: "S",
  id: "Open-HH",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3"
}, 
  {
  keyCode: 68,
  key: "D",
  id: "Closed-HH",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3"
}, 
  {
  keyCode: 90,
  key: "Z",
  id: "Punchy-Kick",
  url: "https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3"
}, 
  {
  keyCode: 88,
  key: "X",
  id: "Side-Stick",
  url: "https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3"
}, 
  {
  keyCode: 67,
  key: "C",
  id: "Snare",
  url: "https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3"
}]

const soundsName = {
  heaterKit: "Heater Kit",
  pianoKit: "Piano Kit"
}

const soundTypes = {
  heaterKit: audioClips,
  pianoKit: audioClips2
}

const DrumPad = ({ play, sound: {id, key, url, keyCode} }) => {
 
 const handleKeydown = (event) => {
  if (event.keyCode === keyCode) {
   
    document.getElementById(keyCode).style.backgroundColor = "orange";
    setTimeout(() => {
      document.getElementById(keyCode).style.backgroundColor = "white"
    }, 300);
     play(key, id);
  }
}

  React.useEffect(() => {
    document.addEventListener("keydown", handleKeydown);
  }, [])
return (
  <>
  <button id={keyCode} className="drum-pad" onClick={() => play(key, id)}>
    <audio className="clip" id={key} src={url}></audio>{key}
  </button>
  </>
)
}

const DrumMachine = ({ power, play, sounds }) => {
return (
<>
  {
  power 
  ? sounds.map((sound) => <DrumPad play={play} sound={sound} />)
  : sounds.map((sound) => <DrumPad play={play} sound={{...sound, url: ""}} />)
  }
</>
)
}


const DrumControls = ({powerOff, name, isChecked, check, power, volume, volumeChange, changeSounds}) => {
  return (
  <>
    <div class="form-check form-switch">
      <label class="form-check-label" for="flexSwitchCheckChecked">Power: {power ? "On" : "Off"}</label>
      <input class="form-check-input indicator" type="checkbox" role="switch" id="flexSwitchCheckChecked" checked={isChecked} onClick={check} onChange={powerOff} />
    </div>
    <h5>Volume: {Math.round(volume * 100)}%</h5>
    <label for="customRange1" class="form-label"></label>
    <input type="range" class="form-range" id="customRange1" max="1" min="0" step="0.01" volume={volume} onChange={volumeChange} />
    <h2 id="display">{name}</h2>
    <div class="form-check form-switch">
      <label class="form-check-label" for="flexSwitchCheckDefault">Bank</label>
      <input class="form-check-input bank" type="checkbox" role="switch" id="flexSwitchCheckDefault" onClick={changeSounds} />
    </div>
  </>
  )
}

function App() {
const [isChecked, setIsChecked] = useState(true);
const [power, setPower] = useState(true);
const [volume, setVolume] = useState(1);
const [soundName, setSoundName] = useState("");
const [nextSounds, setNextSounds] = useState("heaterKit");
const [sounds, setSounds] = useState(soundTypes.heaterKit);

  const powerOff = () => {
    setPower(!power);
  }

  const handleChecked = (event) => {
    setIsChecked(event.target.checked);
  }

  const volumeChange = (e) => {
    setVolume(e.target.value);
  }

  const play = (key, sound) => {
    setSoundName(sound);
    const audio = document.getElementById(key);
    audio.parentElement.style.backgroundColor = "orange";
    setTimeout(() => {
    audio.parentElement.style.backgroundColor = "white"
    }, 300);
    audio.currentTime = 0;
    audio.play();
  }
  
  const changeSounds = () => {
    setSoundName('');
   if (nextSounds === "heaterKit") {
    setNextSounds("pianoKit");
    setSounds(soundTypes.pianoKit);
   } else {
    setNextSounds("heaterKit");
    setSounds(soundTypes.heaterKit);
   }
  }

  const controlVolume = () => {
    const audios = sounds.map(sound => document.getElementById(sound.key));
    audios.forEach(audio => {
      if (audio) {
        audio.volume = volume;
      }
    })
  }

  return (
    <>
    <div id="drum-machine" className="inner-container">
        {controlVolume()}
      <div className="pad-container">
        <DrumMachine power={power} play={play} sounds={sounds} />
      </div>
      <div className="control-container">
        <DrumControls 
        powerOff={powerOff}
        isChecked={isChecked} 
        check={handleChecked} 
        power={power} 
        volume={volume} 
        volumeChange={volumeChange} 
        name={soundName || soundsName[nextSounds]} 
        changeSounds={changeSounds} />
      </div>
    </div>
    </>
  )
}

export default App
