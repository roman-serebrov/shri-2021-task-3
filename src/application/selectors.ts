import { Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { DELAY, Slide, State } from './types';

interface SlideData<T> {
    index: number;
    value: T;
}

export const createProgressSelector = (state$: Observable<State>) => state$.pipe(
    map(({ index, progress }): SlideData<number> => ({ index, value: progress / DELAY })),
    distinctUntilChanged(),    
);

export const createCurrentIndexSelector = (state$: Observable<State>) => state$.pipe(
    map(s => s.index),
    distinctUntilChanged(),
    // mergeMapTo(EMPTY), не срабатовало переключение слайдов
);

export const createThemeSelector = (state$: Observable<State>) => state$.pipe(
    map(s => s.theme),
    distinctUntilChanged(),
);

export const createCurrentDataSelector = (state$: Observable<State>) => state$.pipe(
    map(({ index, stories }): SlideData<Slide> => ({ index, value: stories[index] })),
    distinctUntilChanged(
        (a, b) => a.index === b.index && a.value === b.value
    )
);
