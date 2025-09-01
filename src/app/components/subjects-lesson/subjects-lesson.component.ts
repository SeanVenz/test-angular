import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { Subject, BehaviorSubject, ReplaySubject, interval, take, takeUntil, tap } from 'rxjs';
import { toSignal, takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-subjects-lesson',
  standalone: true,
  template: `
    <section class="p-4 space-y-6">
      <h2>Lesson 3 — Subjects Playground</h2>

      <!-- 1) Plain Subject demo -->
      <div>
        <h3>1) Subject (hot, no replay)</h3>
        <button (click)="emitToSubject('Click ' + (++clicks))">Emit to Subject</button>
        <button (click)="subscribeLateToSubject()">Subscribe B (late)</button>

        <div class="mt-2">
          @for (e of subjectEvents(); track $index) {
            <div>{{ e }}</div>
          }
          @empty { <div>No events yet.</div> }
        </div>
      </div>

      <hr />

      <!-- 2) BehaviorSubject demo -->
      <div>
        <h3>2) BehaviorSubject (latest value on subscribe)</h3>
        <div>Status (signal via toSignal): <strong>{{ statusSig() }}</strong></div>
        <button (click)="setStatus('ready')">Set: ready</button>
        <button (click)="setStatus('live')">Set: live</button>
        <button (click)="subscribeLateToBehavior()">Subscribe late (Behavior)</button>

        <div class="mt-2">
          @for (e of behaviorEvents(); track $index) {
            <div>{{ e }}</div>
          }
          @empty { <div>No behavior events yet.</div> }
        </div>
      </div>

      <hr />

      <!-- 3) ReplaySubject demo -->
      <div>
        <h3>3) ReplaySubject (buffer last 2)</h3>
        <button (click)="emitReplay()">Emit 1, 2, 3 (once)</button>
        <button (click)="subscribeReplayEarly()">Subscribe R1 (early)</button>
        <button (click)="subscribeReplayLate()">Subscribe R2 (late)</button>

        <div class="mt-2">
          @for (e of replayEvents(); track $index) {
            <div>{{ e }}</div>
          }
          @empty { <div>No replay events yet.</div> }
        </div>
      </div>

      <hr />

      <!-- 4) Bonus: Accumulator using Subject + scan-like pattern -->
      <div>
        <h3>4) Bonus: Counter with Subject (scan pattern)</h3>
        <button (click)="increment()">+1</button>
        <button (click)="decrement()">-1</button>
        <div class="mt-2">Count (signal): <strong>{{ countSig() }}</strong></div>
      </div>
    </section>
  `,
  styles: [`
    :host { display: block; font-family: system-ui, sans-serif; }
    h2 { margin: 0 0 0.75rem; }
    h3 { margin: 0.5rem 0; }
    button { margin-right: 0.5rem; }
    hr { border: 0; border-top: 1px solid #ddd; margin: 1rem 0; }
  `]
})
export class SubjectsLessonComponent implements OnInit, OnDestroy {
  // --- Destroy subject for cleanup ---
  private destroy$ = new Subject<void>();
  
  // --- 1) Subject demo ---
  private news$ = new Subject<string>();
  subjectEvents = signal<string[]>([]);
  clicks = 0;
  private subjectSubscribedB = false;

  // --- 2) BehaviorSubject demo ---
  private status$ = new BehaviorSubject<string>('init');
  statusSig = toSignal(this.status$, { initialValue: this.status$.value });
  behaviorEvents = signal<string[]>([]);
  private behaviorLateSubscribed = false;

  // --- 3) ReplaySubject demo ---
  private replay$ = new ReplaySubject<number>(2); // keep last 2
  private replayEmitted = false;
  private replayEarlySubbed = false;
  private replayLateSubbed = false;
  replayEvents = signal<string[]>([]);

  // --- 4) Counter via Subject (+/- intents) ---
  private add$ = new Subject<number>();
  // Keep a running total in a BehaviorSubject, fed by add$
  private count$ = new BehaviorSubject<number>(0);
  countSig = toSignal(this.count$, { initialValue: 0 });

  ngOnInit(): void {
    // 1) Subject: subscribe A immediately
    this.news$
      .pipe(
        tap(v => this.appendSubject(`A saw: ${v}`)),
        takeUntil(this.destroy$)
      )
      .subscribe();

    // Add some timed emissions to show B (late) missing early values
    interval(500)
      .pipe(
        take(3), // 0,1,2
        tap(i => this.news$.next(['Hello', 'World', 'RxJS'][i])),
        takeUntil(this.destroy$)
      )
      .subscribe();

    // 4) Wire up counter: forward add$ to count$ (scan-like)
    this.add$
      .pipe(
        tap(delta => this.count$.next(this.count$.value + delta)),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  // ===== 1) Subject controls =====
  emitToSubject(v: string) {
    this.news$.next(v);
  }
  subscribeLateToSubject() {
    if (this.subjectSubscribedB) return;
    this.subjectSubscribedB = true;

    this.news$
      .pipe(
        tap(v => this.appendSubject(`B (late) saw: ${v}`)),
        takeUntil(this.destroy$)
      )
      .subscribe();

    this.appendSubject(`B subscribed (late). It will NOT see past values.`);
  }
  private appendSubject(msg: string) {
    this.subjectEvents.update(arr => [...arr, msg]);
  }

  // ===== 2) BehaviorSubject controls =====
  setStatus(v: 'ready' | 'live' | 'init' | (string)) {
    this.status$.next(v);
    this.behaviorEvents.update(arr => [...arr, `Set status -> ${v}`]);
  }
  subscribeLateToBehavior() {
    if (this.behaviorLateSubscribed) return;
    this.behaviorLateSubscribed = true;

    this.status$
      .pipe(
        tap(v => this.behaviorEvents.update(arr => [...arr, `Late sub got: ${v}`])),
        takeUntil(this.destroy$)
      )
      .subscribe();

    this.behaviorEvents.update(arr => [...arr, `Late subscriber attached (gets latest immediately).`]);
  }

  // ===== 3) ReplaySubject controls =====
  emitReplay() {
    if (this.replayEmitted) return;
    this.replayEmitted = true;
    this.replay$.next(1);
    this.replay$.next(2);
    this.replay$.next(3);
    this.replayEvents.update(arr => [...arr, `Emitted: 1, 2, 3`]);
  }
  subscribeReplayEarly() {
    if (this.replayEarlySubbed) return;
    this.replayEarlySubbed = true;

    this.replay$
      .pipe(
        tap(v => this.replayEvents.update(a => [...a, `R1 saw: ${v}`])),
        takeUntil(this.destroy$)
      )
      .subscribe();

    this.replayEvents.update(a => [...a, `R1 subscribed (early).`]);
  }
  subscribeReplayLate() {
    if (this.replayLateSubbed) return;
    this.replayLateSubbed = true;

    this.replay$
      .pipe(
        tap(v => this.replayEvents.update(a => [...a, `R2 (late) got: ${v}`])),
        takeUntil(this.destroy$)
      )
      .subscribe();

    this.replayEvents.update(a => [...a, `R2 subscribed (late) — will instantly receive last 2 emissions.`]);
  }

  // ===== 4) Counter controls =====
  increment() { this.add$.next(1); }
  decrement() { this.add$.next(-1); }

  // ===== Cleanup =====
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
