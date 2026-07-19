<script>
let {
	minutes = $bindable(1),
	autostart = $bindable(true),
	isRunning = $bindable(false),
	currentTime = $bindable(),
	onStartEvent = () => {},
	onStopEvent = () => {},
	onUpdateEvent = () => {},
} = $props();
import { onMount } from 'svelte';
import { SvelteDate } from 'svelte/reactivity';
import * as dfn from 'date-fns';
import PlayIcon from '@lucide/svelte/icons/play';
import StopIcon from '@lucide/svelte/icons/square';
import PlusIcon from '@lucide/svelte/icons/plus';
import MinusIcon from '@lucide/svelte/icons/minus';
import ResetIcon from '@lucide/svelte/icons/timer-reset';
import Button from "$lib/components/ui/button/button.svelte";
import Input from "$lib/components/ui/input/input.svelte";
import Badge from '$lib/components/ui/badge/badge.svelte';
import Progress from '$lib/components/ui/progress/progress.svelte';
import TimeBox from './TimeBox.svelte';
    import Label from '$lib/components/ui/label/label.svelte';
    import Transition from './Transition.svelte';

const pad = (n) => n.toString().padStart(2, '0');

const timeout = 1000;
let interval = null;
let startHour = $state(null);
let endHour = $state(null);

// svelte-ignore state_referenced_locally
let min = $state(minutes);
const totalSecs = $derived(	dfn.minutesToSeconds(min) );
let countSecs = $state(0);

let startTime = $derived(
	dfn.getTime( new Date(2026, 0, 1, 0, min, 0)	)
);
// let currentTime = $state();

function handleStop() {
	isRunning = false;
	endHour = new Date(); 
	if (interval) clearInterval(interval);
}
function handleDecrement() {
	let tm = min - 5;
	min = tm > 0 ? tm : min;
}
function handleIncrement() {
	min += 5;
}
function handleInit() {
	countSecs = 0;
	isRunning = false;
	currentTime = dfn.sub(startTime, { seconds: countSecs });
	startHour = new Date(); 
}
function handleComplete() {
	handleStop();
}
function handleStart() {
	if (isRunning) return;
	handleInit();
	isRunning = true;
	interval = setInterval(() => {		
		currentTime = dfn.sub(startTime, { seconds: countSecs+1 });
		countSecs++;
		if(countSecs >= totalSecs) { handleComplete() }
		onUpdateEvent(currentTime);
	}, timeout);
}
function handleDurationChange() {
	handleStop();
	handleInit();
	countSecs = 0;
}
function handleReset() {
	handleStop();
	countSecs = 0;
	min = minutes;
	handleStart();
}
$effect(() => {
	return () => { 
		if (interval) clearInterval(interval) 
	}
});
onMount(() => {
	if ( autostart ) handleStart();
})
</script>

{#snippet timeset()}
	<div class="flex flex-row items-center gap-2">		
		<div class="flex gap-3">
			<Label class="text-black dark:text-white text-lg p-1 w-8">{min}</Label>
			<Input 
				class="w-18 rounded bg-input/30 h-8 hidden"
				type="number"
				disabled={isRunning}
				min="1" 
				max="120"
				bind:value={min}
				oninput={handleDurationChange} 
				/>
		<Button 
			onclick={handleIncrement} 
			class="h-8"
			variant="secondary"
			>
			<PlusIcon/>
		</Button>
		<Button 
			class="h-8"
			onclick={handleDecrement} 
			variant="secondary">
			<MinusIcon/>
		</Button>
		</div>
	</div>
{/snippet}

{#snippet player()}
	<div class="flex flex-row gap-2 items-center">
		<Button 
			onclick={handleStart} 
			variant="secondary"
			class="drop-shadow-md/50 hover:bg-accent/50 disabled:text-secondary-foreground"
			disabled={isRunning}>
			<PlayIcon/>
		</Button>
		<Button 
			onclick={handleStop} 
			class="drop-shadow-md/50 hover:bg-accent/50 disabled:text-secondary-foreground"
			variant="secondary"
			disabled={!isRunning}>
			<StopIcon/>
		</Button>
		<Button 
			onclick={handleReset}
			class="drop-shadow-md/50 hover:bg-accent/50 disabled:text-secondary-foreground"
			variant="secondary">
			<ResetIcon/>
		</Button>		
	</div>
{/snippet}

{#snippet countdown()}
	<div class="flex flex-col w-60 gap-4">
		<TimeBox
			class="text-accent text-xl dark:text-[oklch(55.4_0.20816_180.433)]"
			fmt="HH:mm:ss"
			bind:date={currentTime}
		/>
		<Progress 
			class="h-2 rounded"
			value={countSecs} 
			max={totalSecs} />
	</div>
{/snippet}

{#snippet countdownFlick()}
	<Transition bind:isRunning>
	<div class="flex flex-col w-60 gap-4">
		<TimeBox
			class="text-accent text-xl dark:text-[oklch(55.4_0.20816_180.433)]"
			fmt="HH:mm:ss"
			bind:date={currentTime}
		/>
		<Progress 
			class="h-2 rounded"
			value={countSecs} 
			max={totalSecs} />
	</div>
	</Transition>
{/snippet}

{#snippet timeit()}
	<div class="flex gap-2 text-secondary-foreground/50">
		{#if startHour}
			<div class="w-10">start</div>
			<TimeBox
				class="text-secondary-foreground/50 text-md"
				fmt="HH:mm:ss"
				bind:date={startHour}
			/>
		{/if}
	</div>
	<div class="flex gap-2 text-secondary-foreground/50">
		{#if endHour}
			<div class="w-10">end</div>
			<TimeBox
				class="text-md text-secondary-foreground/50"
				fmt="HH:mm:ss"
				bind:date={endHour}
			/>
		{/if}
	</div>
{/snippet}

<div class="flex flex-col p-4 gap-4">

	{@render timeset()}
	{@render player()}
	<!-- {@render countdown()} -->
	{@render countdownFlick()}
	{@render timeit()}

</div>

<style>
</style>