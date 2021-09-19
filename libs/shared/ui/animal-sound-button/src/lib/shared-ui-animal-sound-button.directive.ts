import {
  Directive,
  HostBinding,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subject, switchMap, takeUntil } from 'rxjs';
import { playSound } from './common/play-sound';

type AnimalType = 'dog' | 'cat';

@Directive({
  selector: 'button[flightWorkspaceSharedUiAnimalSoundButton]',
})
export class SharedUiAnimalSoundButtonDirective implements OnInit, OnDestroy {
  @Input() flightWorkspaceSharedUiAnimalSoundButton?: AnimalType;

  @HostBinding('title') title = 'I make animal sounds!';

  private play$$ = new Subject<AnimalType>();
  private animalSoundMap: Record<AnimalType, string> = {
    cat: 'cat_purr_close',
    dog: 'dog_barking',
  };

  private destroy$$ = new Subject<void>();

  ngOnInit(): void {
    this.play$$
      .pipe(
        switchMap((animalType) =>
          playSound(
            `https://actions.google.com/sounds/v1/animals/${this.animalSoundMap[animalType]}.ogg`
          )
        ),
        takeUntil(this.destroy$$)
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$$.next();
  }

  @HostListener('click', ['$event'])
  onClick(event: MouseEvent): void {
    event.preventDefault();

    const animalType: AnimalType | undefined =
      this.flightWorkspaceSharedUiAnimalSoundButton;
    animalType && this.play$$.next(animalType);
  }
}
