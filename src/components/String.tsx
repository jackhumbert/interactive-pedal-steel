import * as React from 'react';
import Note, { Sharps } from '../classes/Note'
import NoteComponent from '../components/NoteComponent'

export class Adjustment {
    name : string;
    index : number[];
    interval : number;
    constructor(name : string, index : number[], interval : number) {
      this.name = name;
      this.index = index;
      this.interval = interval
    }
  }

export class String {
    baseNote: Note;
    adjustments: Adjustment[];
  
    constructor(baseNote : Note, adjustments : Adjustment[]) {
      this.baseNote = baseNote;
      this.adjustments = adjustments;
    }
  }

export default class StringComponent extends React.Component<{ baseNote: Note}> {
    positions = 24;
    state = {
        pedal: 0
    }
    // onClick = () => {
    //     if (this.props.string.adjustment) {
    //         this.setState({
    //             pedal: this.state.pedal == 0 ? this.props.string.adjustment.interval : 0
    //         });
    //     }onClick={this.onClick} 
    // };
    render () {
        const notes = [];
        for (let index = -2; index < this.positions + 2; index++) {
            let note = new Note(this.props.baseNote.midi + index);
            note.fret = index;
            notes.push(note);
        }
        let className = "string pedal-" + this.state.pedal;
        return (
            <div className={className}>
            {notes.map(note => (
                <NoteComponent note={note} />
            ))}
            <div className="end" />
            </div>
        );
    }
};