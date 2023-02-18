import * as React from 'react';

export enum Letter {
    C,
    CsDb,
    D,
    DsEb,
    E, 
    F,
    FsGb,
    G,
    GsAb,
    A,
    AsBb,
    B,
}

export enum Accidental {
    DoubleFlat,
    Flat,
    Natural,
    Sharp,
    DoubleSharp
}

const AccidentalStrings = [
    "♭♭",
    "♭",
    "",
    "♯",
    "♯♯"
]

export class ScaleNote {
    letter : Letter;
    accidental: Accidental;
    constructor(letter : Letter, accidental: Accidental) {
        this.letter = letter;
        this.accidental = accidental;
    }
}

export class Scale {
    notes: ScaleNote[];
    constructor(notes : ScaleNote[]) {
        this.notes = notes;
    }
}

export const Flats = new Scale([
    new ScaleNote(Letter.C, Accidental.Natural),
    new ScaleNote(Letter.D, Accidental.Flat),
    new ScaleNote(Letter.D, Accidental.Natural),
    new ScaleNote(Letter.E, Accidental.Flat),
    new ScaleNote(Letter.E, Accidental.Natural),
    new ScaleNote(Letter.F, Accidental.Natural),
    new ScaleNote(Letter.G, Accidental.Flat),
    new ScaleNote(Letter.G, Accidental.Natural),
    new ScaleNote(Letter.A, Accidental.Flat),
    new ScaleNote(Letter.A, Accidental.Natural),
    new ScaleNote(Letter.B, Accidental.Flat),
    new ScaleNote(Letter.B, Accidental.Natural)
]);

export const Sharps = new Scale([
    new ScaleNote(Letter.C, Accidental.Natural),
    new ScaleNote(Letter.C, Accidental.Sharp),
    new ScaleNote(Letter.D, Accidental.Natural),
    new ScaleNote(Letter.D, Accidental.Sharp),
    new ScaleNote(Letter.E, Accidental.Natural),
    new ScaleNote(Letter.F, Accidental.Natural),
    new ScaleNote(Letter.F, Accidental.Sharp),
    new ScaleNote(Letter.G, Accidental.Natural),
    new ScaleNote(Letter.G, Accidental.Sharp),
    new ScaleNote(Letter.A, Accidental.Natural),
    new ScaleNote(Letter.A, Accidental.Sharp),
    new ScaleNote(Letter.B, Accidental.Natural)
]);

export default class Note {
    midi: number;
    fret: number;
    frequency() : number { 
        return 440.0 * Math.pow(2, (this.midi - 69) / 12);
    }
    letter(scale : Scale = Sharps) : string {
        return Letter[scale.notes[(this.midi - 24) % 12].letter];
    }
    accidental(scale : Scale = Sharps) : string {
        return AccidentalStrings[scale.notes[(this.midi - 24) % 12].accidental];
    }
    letterAccidental(scale : Scale = Sharps) : string {
        return this.letter(scale) + this.accidental(scale);
    }
    scaleIndex() : number {
        return (this.midi - 24) % 12;
    }
    octave() : number {
        return Math.floor((this.midi - 24) / 12) + 1;
    }
    toString(scale : Scale = Sharps) : string {
        return this.letter(scale) + this.accidental(scale) + this.octave();
    }

    constructor(midi : number) {
        this.midi = midi;
        this.fret = 0;
    }
    getInterval(offset : number) {
        return new Note(this.midi + offset);
    }

    static fromMidi(midi : number) {
        return new Note(midi);
    }
    static fromNote(letter : Letter, accidental : Accidental, octave : number) : Note {
        const note = new Note(((octave - 1) * 12) + letter + (accidental - Accidental.Natural) + 24);
        return note;
    }
}