import {autoserialize, autoserializeAs} from 'cerialize';

export class Sentence {
    /**
     * Holds a sentence and a time mark for when in the audio clip the sentence occurred.
     */
    @autoserialize text: string;
    @autoserialize time: number;
    @autoserialize audioUuid: string;

    constructor(text: string, time: number, audioUuid: string) {
        this.text = text;
        this.time = time;
        this.audioUuid = audioUuid;
    }
}