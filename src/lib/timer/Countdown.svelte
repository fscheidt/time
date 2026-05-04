<script>
let {
	minutes = 25,
	autostart = $bindable(false),
	isRunning = $bindable(false),
	currentTime = $bindable(),
	onStartEvent = () => {},
	onStopEvent = () => {},
	onUpdateEvent = () => {},
} = $props();
import { onMount } from 'svelte';
import { SvelteDate } from 'svelte/reactivity';
import { getTime, sub, minutesToSeconds } from 'date-fns';
import PlayIcon from '@lucide/svelte/icons/play';
import StopIcon from '@lucide/svelte/icons/square';
import ResetIcon from '@lucide/svelte/icons/timer-reset';
import Button from "$lib/components/ui/button/button.svelte";
import Input from "$lib/components/ui/input/input.svelte";
import Badge from '$lib/components/ui/badge/badge.svelte';
import Progress from '$lib/components/ui/progress/progress.svelte';
import TimeBox from './TimeBox.svelte';

const pad = (n) => n.toString().padStart(2, '0');

const timeout = 1000;
let interval = null;

// svelte-ignore state_referenced_locally
let min = $state(minutes);
const totalSecs = $derived(	minutesToSeconds(min) );
let countSecs = $state(0);

let startTime = $derived(getTime(
  new Date(2026, 0, 1, 0, min, 0)	
));
// let currentTime = $state();

function handleStop() {
	isRunning = false;
	if (interval) clearInterval(interval);
}
function handleInit() {
	countSecs = 0;
	isRunning = false;
	currentTime = sub(startTime, { seconds: countSecs });
}
function handleComplete() {
	handleStop();
}
function handleStart() {
	if (isRunning) return;
	handleInit();
	isRunning = true;
	interval = setInterval(() => {		
		currentTime = sub(startTime, { seconds: countSecs+1 });
		countSecs++;
		if(countSecs >= totalSecs) {
			handleComplete();
		}
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

<div class="flex flex-col p-4 gap-4">

	<div class="flex flex-row gap-2 items-center">
		
		<Button onclick={handleStart} 
			variant="secondary"
			disabled={isRunning}>
			<PlayIcon/>
		</Button>
		
		<Button onclick={handleStop} 
			variant="secondary"
			disabled={!isRunning}>
			<StopIcon/>
		</Button>

		<Button onclick={handleReset}
			variant="secondary"
			>
			<ResetIcon/>
		</Button>		
	</div>

	<div class="flex flex-row items-center">
		<Badge variant="ghost">min</Badge>
		<div class="flex">
			<Input 
				class="w-18 rounded"
				type="number"
				disabled={isRunning}
				min="1"
				max="120"
				bind:value={min}
				oninput={handleDurationChange}
				placeholder="minutes"
				/>
		</div>
		
	</div>

	<div class="flex flex-row w-60 justify-between">
		<TimeBox
			class="text-teal-500 text-xl"
			fmt="HH:mm:ss"
			bind:date={currentTime}
		/>
	</div>

	<Progress 
		class="h-2 w-[60%] rounded"
		value={countSecs} 
		max={totalSecs} />

</div>

<style>
</style>