import React from 'react';
import './App.css';
import classnames from 'classnames';

import Note, { Accidental, Letter } from './classes/Note';
import StringComponent, { Adjustment, Movement, String } from './components/String';

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
    this.props.adjustment.movements.forEach(i => {
      if (this.props.strings[i.index].current) {
        const string = this.props.strings[i.index].current as StringComponent;
        if (this.state.active) {
          this.setState({
            active: false
          });
          string.setState({
            pedal: string.state.pedal - i.interval
          });
        } else {
          this.setState({
            active: true
          });
          string.setState({
            pedal: string.state.pedal + i.interval
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
  Major,
  Sus4,
  Minor,
  DomSeven,
  MajorSeven,
  MinorSeven,
  DomNine,
  MajorNine,
  MinorNine,
  MajorSevenFlatFive,
  MajorSixNine,
  DomNineFlatTwo,
  DomNineSharpTwo,
  DomSevenSharpFive,
  DomSevenFlatFive,
  MinorSix,
  MinorSevenFlatFive,
  DimSeven,
  MAX
};

class Board extends React.Component {
  state = {
    scaleNote: 0,
    // scaleNote: 4,
    scaleQuality: ScaleQuality.Major
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
    if (this.state.scaleQuality == ScaleQuality.Major) {
      names += "scale-" + state + "-0 ";
      names += "scale-" + state + "-4 ";
      names += "scale-" + state + "-7 ";
    }
    if (this.state.scaleQuality == ScaleQuality.Sus4) {
      names += "scale-" + state + "-0 ";
      names += "scale-" + state + "-5 ";
      names += "scale-" + state + "-7 ";
    }
    if (this.state.scaleQuality == ScaleQuality.Minor) {
      names += "scale-" + state + "-0 ";
      names += "scale-" + state + "-3 ";
      names += "scale-" + state + "-7 ";
    }
    if (this.state.scaleQuality == ScaleQuality.DomSeven) {
      names += "scale-" + state + "-0 ";
      names += "scale-" + state + "-4 ";
      names += "scale-" + state + "-7 ";
      names += "scale-" + state + "-10 ";
    }
    if (this.state.scaleQuality == ScaleQuality.MajorSeven) {
      names += "scale-" + state + "-0 ";
      names += "scale-" + state + "-4 ";
      names += "scale-" + state + "-7 ";
      names += "scale-" + state + "-11 ";
    }
    if (this.state.scaleQuality == ScaleQuality.MinorSeven) {
      names += "scale-" + state + "-0 ";
      names += "scale-" + state + "-3 ";
      names += "scale-" + state + "-7 ";
      names += "scale-" + state + "-10 ";
    }
    if (this.state.scaleQuality == ScaleQuality.DomNine) {
      names += "scale-" + state + "-0 ";
      names += "scale-" + state + "-2 ";
      names += "scale-" + state + "-4 ";
      names += "scale-" + state + "-7 ";
      names += "scale-" + state + "-10 ";
    }
    if (this.state.scaleQuality == ScaleQuality.MajorNine) {
      names += "scale-" + state + "-0 ";
      names += "scale-" + state + "-2 ";
      names += "scale-" + state + "-4 ";
      names += "scale-" + state + "-7 ";
      names += "scale-" + state + "-11 ";
    }
    if (this.state.scaleQuality == ScaleQuality.MinorNine) {
      names += "scale-" + state + "-0 ";
      names += "scale-" + state + "-2 ";
      names += "scale-" + state + "-3 ";
      names += "scale-" + state + "-7 ";
      names += "scale-" + state + "-10 ";
    }
    if (this.state.scaleQuality == ScaleQuality.MajorSevenFlatFive) {
      names += "scale-" + state + "-0 ";
      names += "scale-" + state + "-4 ";
      names += "scale-" + state + "-6 ";
      names += "scale-" + state + "-11 ";
    }
    if (this.state.scaleQuality == ScaleQuality.MajorSixNine) {
      names += "scale-" + state + "-0 ";
      names += "scale-" + state + "-4 ";
      names += "scale-" + state + "-7 ";
      names += "scale-" + state + "-9 ";
      names += "scale-" + state + "-2 ";
    }
    if (this.state.scaleQuality == ScaleQuality.DomNineFlatTwo) {
      names += "scale-" + state + "-0 ";
      names += "scale-" + state + "-1 ";
      names += "scale-" + state + "-4 ";
      names += "scale-" + state + "-7 ";
      names += "scale-" + state + "-10 ";
    }
    if (this.state.scaleQuality == ScaleQuality.DomNineSharpTwo) {
      names += "scale-" + state + "-0 ";
      names += "scale-" + state + "-3 ";
      names += "scale-" + state + "-4 ";
      names += "scale-" + state + "-7 ";
      names += "scale-" + state + "-10 ";
    }
    if (this.state.scaleQuality == ScaleQuality.DomSevenSharpFive) {
      names += "scale-" + state + "-0 ";
      names += "scale-" + state + "-4 ";
      names += "scale-" + state + "-8 ";
      names += "scale-" + state + "-10 ";
    }
    if (this.state.scaleQuality == ScaleQuality.DomSevenFlatFive) {
      names += "scale-" + state + "-0 ";
      names += "scale-" + state + "-4 ";
      names += "scale-" + state + "-6 ";
      names += "scale-" + state + "-10 ";
    }
    if (this.state.scaleQuality == ScaleQuality.MinorSix) {
      names += "scale-" + state + "-0 ";
      names += "scale-" + state + "-3 ";
      names += "scale-" + state + "-7 ";
      names += "scale-" + state + "-9 ";
    }
    if (this.state.scaleQuality == ScaleQuality.MinorSevenFlatFive) {
      names += "scale-" + state + "-0 ";
      names += "scale-" + state + "-3 ";
      names += "scale-" + state + "-6 ";
      names += "scale-" + state + "-10 ";
    }
    if (this.state.scaleQuality == ScaleQuality.DimSeven) {
      names += "scale-" + state + "-0 ";
      names += "scale-" + state + "-3 ";
      names += "scale-" + state + "-6 ";
      names += "scale-" + state + "-8 ";
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

    // Stock Sho-Bud
    // new Adjustment("A", [{index: 4, interval: 2}, {index: 9, interval: 2}]),
    // new Adjustment("B", [{index: 5, interval: 1}, {index: 2, interval: 1}]),
    // new Adjustment("C", [{index: 3, interval: 2}, {index: 4, interval: 2}]),
    // new Adjustment("K", [{index: 1, interval: -1}, {index: 7, interval: -1}]),
    // Jack's
    // new Adjustment("A", [{index: 2, interval: 1}]),
    // new Adjustment("B", [{index: 5, interval: 1}, {index: 0, interval: 1}]),
    // new Adjustment("C", [{index: 4, interval: 1}, {index: 8, interval: 1}]),
    // new Adjustment("K", [{index: 6, interval: -1}, {index: 9, interval: -1}]),
    
    // Jimmy Day's C6
    // // makes 6 into maj7
    // new Adjustment("P4", [{index: 3, interval: 2}, {index: 7, interval: 2}]),
    // // lower b5, upper #5, major II in bass
    // new Adjustment("P5", [{index: 0, interval: 1}, {index: 4, interval: -1}, {index: 8, interval: 1}, {index: 9, interval: 2}]),
    // // makes lower minor, upper sus4
    // new Adjustment("P6", [{index: 1, interval: 1}, {index: 5, interval: -1}]),
    // // makes upper major 5
    // new Adjustment("P7", [{index: 2, interval: 2}, {index: 3, interval: 2}]),
    // // makes lower relative minor major
    // new Adjustment("P8", [{index: 6, interval: 1}, {index: 8, interval: -1}, {index: 9, interval: -3}]),
    // // makes iii at top
    // new Adjustment("RKL", [{index: 2, interval: -1}]),

    // Jack's C6
    
    // makes sus4, IV
    // new Adjustment("A", [{index: 5, interval: 1}, {index: 4, interval: 2}]),
    // // makes ii
    // new Adjustment("B", [{index: 6, interval: 2}, {index: 9, interval: 2}]),
    // // makes 6 into dom7
    // new Adjustment("C", [{index: 3, interval: 1}, {index: 7, interval: 1}]),
    // // makes maj7 & 9, V at top, min9
    // new Adjustment("K", [{index: 2, interval: -1}, {index: 1, interval: -2}, {index: 0, interval: -2}]),
  ];
  strings = [
    // Jimmy Day's C6
    // Note.fromNote(Letter.G, Accidental.Natural, 5),
    // Note.fromNote(Letter.E, Accidental.Natural, 5),
    // Note.fromNote(Letter.C, Accidental.Natural, 5),
    // Note.fromNote(Letter.A, Accidental.Natural, 4),
    // Note.fromNote(Letter.G, Accidental.Natural, 4),
    // Note.fromNote(Letter.E, Accidental.Natural, 4),
    // Note.fromNote(Letter.C, Accidental.Natural, 4),
    // Note.fromNote(Letter.A, Accidental.Natural, 3),
    // Note.fromNote(Letter.G, Accidental.Natural, 3),
    // Note.fromNote(Letter.C, Accidental.Natural, 3)

    // Jack's C6
    // Note.fromNote(Letter.G, Accidental.Natural, 4),
    // Note.fromNote(Letter.E, Accidental.Natural, 4),
    // Note.fromNote(Letter.C, Accidental.Natural, 4),
    // Note.fromNote(Letter.A, Accidental.Natural, 3),
    // Note.fromNote(Letter.G, Accidental.Natural, 3),
    // Note.fromNote(Letter.E, Accidental.Natural, 3),
    // Note.fromNote(Letter.C, Accidental.Natural, 3),
    // Note.fromNote(Letter.A, Accidental.Natural, 2),
    // Note.fromNote(Letter.F, Accidental.Natural, 2),
    // Note.fromNote(Letter.D, Accidental.Natural, 2)

    // Jack's super C
    // A: bigger IV
    // B: iib m7b5, vi->VI
    // C: bigger I, IVsus4
    // K: 7, bigger I
    { note: Note.fromNote(Letter.A, Accidental.Natural, 4), adjustments: []},
    { note: Note.fromNote(Letter.F, Accidental.Natural, 4), adjustments: [{pedal: "C", interval: 2}]},
    { note: Note.fromNote(Letter.D, Accidental.Natural, 4), adjustments: [{pedal: "C", interval: 2}]},
    { note: Note.fromNote(Letter.B, Accidental.Natural, 3), adjustments: [{pedal: "K", interval: -1}]},
    { note: Note.fromNote(Letter.G, Accidental.Natural, 3), adjustments: [{pedal: "A", interval: 2}]},
    { note: Note.fromNote(Letter.E, Accidental.Natural, 3), adjustments: [{pedal: "A", interval: 1}]},
    { note: Note.fromNote(Letter.C, Accidental.Natural, 3), adjustments: [{pedal: "B", interval: 1}]},
    { note: Note.fromNote(Letter.A, Accidental.Natural, 2), adjustments: [{pedal: "C", interval: 1}]},
    { note: Note.fromNote(Letter.F, Accidental.Natural, 2), adjustments: [{pedal: "K", interval: -1}]},
    { note: Note.fromNote(Letter.D, Accidental.Natural, 2), adjustments: []}

    // E9
    // Note.fromNote(Letter.F, Accidental.Sharp, 5),
    // Note.fromNote(Letter.D, Accidental.Sharp, 5),
    // Note.fromNote(Letter.G, Accidental.Sharp, 5),
    // Note.fromNote(Letter.E, Accidental.Natural, 5),
    // Note.fromNote(Letter.B, Accidental.Natural, 4),
    // Note.fromNote(Letter.G, Accidental.Sharp, 4),
    // Note.fromNote(Letter.F, Accidental.Sharp, 4),
    // Note.fromNote(Letter.E, Accidental.Natural, 4),
    // Note.fromNote(Letter.D, Accidental.Natural, 4),
    // Note.fromNote(Letter.B, Accidental.Natural, 3)
    // Jack's
    // Note.fromNote(Letter.F, Accidental.Natural, 5), // 0
    // Note.fromNote(Letter.E, Accidental.Natural, 5), // 1
    // Note.fromNote(Letter.D, Accidental.Natural, 5),    // 2
    // Note.fromNote(Letter.C, Accidental.Sharp, 5), // 3
    // Note.fromNote(Letter.B, Accidental.Natural, 4), // 4
    // Note.fromNote(Letter.A, Accidental.Natural, 4), // 5
    // Note.fromNote(Letter.G, Accidental.Sharp, 4), // 6
    // Note.fromNote(Letter.E, Accidental.Natural, 4), // 7
    // Note.fromNote(Letter.B, Accidental.Natural, 3), // 8
    // Note.fromNote(Letter.G, Accidental.Sharp, 3)  // 9

    // Note.fromNote(Letter.D, Accidental.Flat, 5), // 0
    // Note.fromNote(Letter.C, Accidental.Natural, 5), // 1
    // Note.fromNote(Letter.B, Accidental.Flat, 4),    // 2
    // Note.fromNote(Letter.A, Accidental.Natural, 4), // 3
    // Note.fromNote(Letter.G, Accidental.Natural, 4), // 4
    // Note.fromNote(Letter.F, Accidental.Natural, 4), // 5
    // Note.fromNote(Letter.E, Accidental.Natural, 4), // 6
    // Note.fromNote(Letter.C, Accidental.Natural, 4), // 7
    // Note.fromNote(Letter.G, Accidental.Natural, 3), // 8
    // Note.fromNote(Letter.E, Accidental.Natural, 3)  // 9

    // Note.fromMidi(60 + 31),
    // Note.fromMidi(60 + 28),
    // Note.fromMidi(60 + 24),
    // Note.fromMidi(60 + 21),
    // Note.fromMidi(60 + 17),
    // Note.fromMidi(60 + 14),
    // Note.fromMidi(60 + 10),
    // Note.fromMidi(60 + 7),
    // Note.fromMidi(60 + 4),
    // Note.fromMidi(60 + 0)
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
    let fretLabels = [];
    for (let i = 0; i < 24; i++) {
      fretLabels.push(i);
    }
    this.strings.forEach((string, i) => {
      string.adjustments.forEach(stringAdjustment => {
        let made = false;
        this.adjustments.forEach(adjustment => {
          if (adjustment.name == stringAdjustment.pedal) {
            adjustment.movements.push(new Movement({index: i, interval: stringAdjustment.interval}));
            made = true;
          }
        });
        if (!made) {
          this.adjustments.push(new Adjustment(stringAdjustment.pedal, [{index: i, interval: stringAdjustment.interval}]));
        }
      });
    });
    this.adjustments.sort((a, b) => a.name.localeCompare(b.name));
  return (
    <div id="board" className={classnames(this.getScaleColors(this.state.scaleNote), "scale-"+ScaleQuality[this.state.scaleQuality])}>
      <div id="strings">
        <div className="fret-labels">
          {fretLabels.map((fret, i) => (
            <div className={"fret-label fret-"+fret}>
              <strong className="label">{Note.fromNote(Letter.E, Accidental.Natural, 3).getInterval(fret).letterAccidental()}</strong>
              <div className="label">{fret}</div>
            </div>
          ))}
          <div className="end"></div>
        </div>
      {this.strings.map((string, i) => (
        <StringComponent ref={this.stringRefs[i]} baseNote={string.note} />
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
