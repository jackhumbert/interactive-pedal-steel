import React from 'react';
import './App.css';
import classnames from 'classnames';

import Note, { Accidental, Letter } from './classes/Note';
import StringComponent, { Adjustment, String } from './components/String';

const board = React.createRef<Board>();

class ScaleNoteComponent extends React.Component<{baseNote: Note}> {
  handleClick = () => {
    if (board.current) {
      board.current.setState({
        scaleNote: this.props.baseNote.scaleIndex(),
        scaleQuality: board.current.state.scaleQuality
      });
    }
  }
  render () {
    return (
      <div onClick={this.handleClick} className={classnames("button", "scale", "scale-"+this.props.baseNote.scaleIndex())}>{this.props.baseNote.letterAccidental()}</div>
    )
  }
}

class ScaleQualityComponent extends React.Component<{quality: ScaleQuality}> {
  handleClick = () => {
    if (board.current) {
      board.current.setState({
        scaleQuality: this.props.quality,
        scaleNote: board.current.state.scaleNote
      });
    }
  }
  render () {
    return (
      <div onClick={this.handleClick} className={classnames("button", "scale", this.props.quality == board.current?.state.scaleQuality ? "active" : "")}>{ScaleQuality[this.props.quality]}</div>
    )
  }
}

class ScaleNoteSelectorComponent extends React.Component {
  render () {
    return (
      <div id="scaleNotes">
        <ScaleNoteComponent baseNote={new Note(60)}></ScaleNoteComponent>
        <ScaleNoteComponent baseNote={new Note(61)}></ScaleNoteComponent>
        <ScaleNoteComponent baseNote={new Note(62)}></ScaleNoteComponent>
        <ScaleNoteComponent baseNote={new Note(63)}></ScaleNoteComponent>
        <ScaleNoteComponent baseNote={new Note(64)}></ScaleNoteComponent>
        <ScaleNoteComponent baseNote={new Note(65)}></ScaleNoteComponent>
        <ScaleNoteComponent baseNote={new Note(66)}></ScaleNoteComponent>
        <ScaleNoteComponent baseNote={new Note(67)}></ScaleNoteComponent>
        <ScaleNoteComponent baseNote={new Note(68)}></ScaleNoteComponent>
        <ScaleNoteComponent baseNote={new Note(69)}></ScaleNoteComponent>
        <ScaleNoteComponent baseNote={new Note(70)}></ScaleNoteComponent>
        <ScaleNoteComponent baseNote={new Note(71)}></ScaleNoteComponent>
      </div>
    )
  }
}

class ScaleQualitySelectorComponent extends React.Component {
  render () {
    let values : ScaleQuality[] = [];
    for (let i = 0; i < ScaleQuality.MAX; i++) {
      values.push(i);
    }
    return (
      <div id="scaleQualities">
        {values.map(value => (
          <ScaleQualityComponent quality={value}></ScaleQualityComponent>
        ))}
      </div>
    )
  }
}

class PedalComponent extends React.Component<{adjustment: Adjustment, strings: React.RefObject<StringComponent>[]}> {
  state = {
    active: false
  }
  handleClick = () => {
    console.log(this.props.adjustment);
    this.props.adjustment.index.forEach(i => {
      if (this.props.strings[i].current) {
        const string = this.props.strings[i].current as StringComponent;
        if (this.state.active) {
          this.setState({
            active: false
          });
          string.setState({
            pedal: string.state.pedal - this.props.adjustment.interval
          });
        } else {
          this.setState({
            active: true
          });
          string.setState({
            pedal: string.state.pedal + this.props.adjustment.interval
          });
        }
      }
    });
  }
  render () {
    return (
      <div onClick={this.handleClick} className={classnames("button", "pedal", this.state.active ? "active" : "")}>{this.props.adjustment.name}</div>
    )
  }
}

enum ScaleQuality {
  MajorScale,
  MinorScale,
  MajorChord,
  MinorChord,
  DomSeventhChord,
  MajorSeventhChord,
  MinorSeventhChord,
  DomNinthChord,
  MajorNinthChord,
  MinorNinthChord,
  MAX
};

class Board extends React.Component {
  state = {
    scaleNote: 0,
    scaleQuality: ScaleQuality.MajorChord
  }
  getScaleColors(state : number) {
    let names = "";
    if (this.state.scaleQuality == ScaleQuality.MajorScale) {
      names += "scale-" + state + "-0 ";
      names += "scale-" + state + "-2 ";
      names += "scale-" + state + "-4 ";
      names += "scale-" + state + "-5 ";
      names += "scale-" + state + "-7 ";
      names += "scale-" + state + "-9 ";
      names += "scale-" + state + "-11";
    }
    if (this.state.scaleQuality == ScaleQuality.MinorScale) {
      names += "scale-" + state + "-0 ";
      names += "scale-" + state + "-2 ";
      names += "scale-" + state + "-3 ";
      names += "scale-" + state + "-5 ";
      names += "scale-" + state + "-7 ";
      names += "scale-" + state + "-8 ";
      names += "scale-" + state + "-10";
    }
    if (this.state.scaleQuality == ScaleQuality.MajorChord) {
      names += "scale-" + state + "-0 ";
      names += "scale-" + state + "-4 ";
      names += "scale-" + state + "-7 ";
    }
    if (this.state.scaleQuality == ScaleQuality.MinorChord) {
      names += "scale-" + state + "-0 ";
      names += "scale-" + state + "-3 ";
      names += "scale-" + state + "-7 ";
    }
    if (this.state.scaleQuality == ScaleQuality.DomSeventhChord) {
      names += "scale-" + state + "-0 ";
      names += "scale-" + state + "-4 ";
      names += "scale-" + state + "-7 ";
      names += "scale-" + state + "-10 ";
    }
    if (this.state.scaleQuality == ScaleQuality.MajorSeventhChord) {
      names += "scale-" + state + "-0 ";
      names += "scale-" + state + "-4 ";
      names += "scale-" + state + "-7 ";
      names += "scale-" + state + "-11 ";
    }
    if (this.state.scaleQuality == ScaleQuality.MinorSeventhChord) {
      names += "scale-" + state + "-0 ";
      names += "scale-" + state + "-3 ";
      names += "scale-" + state + "-7 ";
      names += "scale-" + state + "-10 ";
    }
    if (this.state.scaleQuality == ScaleQuality.DomNinthChord) {
      names += "scale-" + state + "-0 ";
      names += "scale-" + state + "-2 ";
      names += "scale-" + state + "-4 ";
      names += "scale-" + state + "-7 ";
      names += "scale-" + state + "-10 ";
    }
    if (this.state.scaleQuality == ScaleQuality.MajorNinthChord) {
      names += "scale-" + state + "-0 ";
      names += "scale-" + state + "-2 ";
      names += "scale-" + state + "-4 ";
      names += "scale-" + state + "-7 ";
      names += "scale-" + state + "-11 ";
    }
    if (this.state.scaleQuality == ScaleQuality.MinorNinthChord) {
      names += "scale-" + state + "-0 ";
      names += "scale-" + state + "-2 ";
      names += "scale-" + state + "-3 ";
      names += "scale-" + state + "-7 ";
      names += "scale-" + state + "-10 ";
    }
    return names;
  }
  adjustments : Adjustment[] = [
    // new Adjustment("LKL", [3, 7], 1),
    // new Adjustment("LKR", [3, 7], -1),
    // new Adjustment("P1", [4, 9], 2),
    // new Adjustment("P2", [2, 5], 1),
    // new Adjustment("P3", [3, 4], 2),
    // new Adjustment("RKL", [0, 6], 1),
    // new Adjustment("RKR", [1, 8], 2),
    new Adjustment("A", [4, 6], 2),
    new Adjustment("B", [5, 7], 1),
    new Adjustment("C", [4, 0], 2),
    new Adjustment("K", [2, 8], -2),
  ];
  strings = [
    Note.fromNote(Letter.F, Accidental.Sharp, 6),
    Note.fromNote(Letter.D, Accidental.Sharp, 6),
    Note.fromNote(Letter.G, Accidental.Sharp, 5),
    Note.fromNote(Letter.E, Accidental.Natural, 5),
    Note.fromNote(Letter.B, Accidental.Natural, 4),
    Note.fromNote(Letter.G, Accidental.Sharp, 4),
    Note.fromNote(Letter.F, Accidental.Sharp, 4),
    Note.fromNote(Letter.E, Accidental.Natural, 4),
    Note.fromNote(Letter.D, Accidental.Natural, 4),
    Note.fromNote(Letter.B, Accidental.Natural, 3)
  ];
  stringRefs = [
    React.createRef<StringComponent>(),
    React.createRef<StringComponent>(),
    React.createRef<StringComponent>(),
    React.createRef<StringComponent>(),
    React.createRef<StringComponent>(),
    React.createRef<StringComponent>(),
    React.createRef<StringComponent>(),
    React.createRef<StringComponent>(),
    React.createRef<StringComponent>(),
    React.createRef<StringComponent>()
  ];
  render () {
  return (
    <div id="board" className={classnames(this.getScaleColors(this.state.scaleNote), "scale-"+ScaleQuality[this.state.scaleQuality])}>
      <div id="strings">
      {this.strings.map((note, i) => (
        <StringComponent ref={this.stringRefs[i]} baseNote={note} />
      ))}
      </div>
      <div id="pedals">
      {this.adjustments.map(adjustment => (
        <PedalComponent adjustment={adjustment} strings={this.stringRefs} />
      ))}
      </div>
      <ScaleNoteSelectorComponent></ScaleNoteSelectorComponent>
      <ScaleQualitySelectorComponent></ScaleQualitySelectorComponent>
    </div>
  );
      }
};

function App() {
  // const strings = [
  //   React.useState<BoardString>({note: 0})
  // ];
  // const board = React.useState<Board>();
  return (
    <div className="App">
      <Board ref={board} />
    </div>
  );
}

export default App;
