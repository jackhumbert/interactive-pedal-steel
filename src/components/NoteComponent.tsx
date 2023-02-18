import * as React from 'react';
import Note, { Letter, Sharps } from '../classes/Note';
import classnames from 'classnames';

export default class NoteComponent extends React.Component<{ note: Note}> {
    makeIntervalColor(interval : number, color : string) {
        const elements = document.getElementsByClassName(`note-${this.props.note.getInterval(interval).letterAccidental()}`);
        for (let element of elements) {
            if (element instanceof HTMLElement) {
                element.style.backgroundColor = color;
            }
        }
    };

    // This function will be triggered when the mouse pointer is over the button
    buttonMouseOverHandler = (
        event: React.MouseEvent<HTMLDivElement>
    ) => {
        // this.makeIntervalColor(0, "hsl(0 100% 40% / 1.0)");
        // this.makeIntervalColor(2, "hsl(60 100% 50% / 0.5)");
        // this.makeIntervalColor(4, "hsl(120 100% 40% / 1.0)");
        // this.makeIntervalColor(5, "hsl(150 100% 50% / 0.5)");
        // this.makeIntervalColor(7, "hsl(210 100% 40% / 1.0)");
        // this.makeIntervalColor(9, "hsl(270 100% 50% / 0.5)");
        // this.makeIntervalColor(11, "hsl(330 100% 50% / 0.5)");

        this.makeIntervalColor(0,  "rgba(214, 78,  18,  1.0)");
        // this.makeIntervalColor(2,  "rgba(249, 165, 44,  1.0)");
        this.makeIntervalColor(4,  "rgba(239, 223, 72,  1.0)");
        // this.makeIntervalColor(5,  "rgba(139, 211, 70,  1.0)");
        this.makeIntervalColor(7,  "rgba(96,  219, 232, 1.0)");
        // this.makeIntervalColor(9,  "rgba(22,  164, 216, 1.0)");
        // this.makeIntervalColor(11, "rgba(155, 95,  224, 1.0)");

        // const btn: HTMLDivElement = event.currentTarget;
        // btn.style.backgroundColor = "darkred";
    };

    // This function will be triggered when the mouse pointer is moving out of the button
    buttonMouseOutHandler = (
        event: React.MouseEvent<HTMLDivElement>
    ) => {
        this.makeIntervalColor(0, "");
        this.makeIntervalColor(1, "");
        this.makeIntervalColor(2, "");
        this.makeIntervalColor(3, "");
        this.makeIntervalColor(4, "");
        this.makeIntervalColor(5, "");
        this.makeIntervalColor(6, "");
        this.makeIntervalColor(7, "");
        this.makeIntervalColor(8, "");
        this.makeIntervalColor(9, "");
        this.makeIntervalColor(10, "");
        this.makeIntervalColor(11, "");
        // const btn: HTMLDivElement = event.currentTarget;
        // btn.style.backgroundColor = "";
    };
    render () {
        return (
            <div 
            // onMouseOver={this.buttonMouseOverHandler} 
            // onMouseOut={this.buttonMouseOutHandler} 
            className={classnames('note', "fret-"+this.props.note.fret)}>
                <div className={classnames('label', "note-"+this.props.note.letterAccidental(), "scale-"+this.props.note.scaleIndex())}>{this.props.note.letter()}{this.props.note.accidental()}<sub>{this.props.note.octave()}</sub></div>
            </div>
        );
    }
};