import {getTasksByDate} from '../../components/RightPane';
import moment from 'moment';

describe('Right Pane component', () => {
    let today;
    let tomorrow;
    let dayTwo;
    let dayTen;
    beforeEach(() => {
        today = moment();
        tomorrow = moment().add(1, 'days');
        dayTwo = moment().add(2, 'days');
        dayTen = moment().add(10, 'days');
    });

    it('Group tasks by date', () => {
        const tasks = [
            {date: today},
            {date: dayTen},
            {date: dayTwo},
            {date: tomorrow},
            {date: 'someday'}
        ];
        expect(getTasksByDate(tasks)).toEqual(
            [
                [  {date: today}  ],
                [ {date: tomorrow} ],
                [ 
                    {date: dayTen},
                    {date: dayTwo}
                ],
                [ {date: 'someday'} ]
            ]
        );
    })
});