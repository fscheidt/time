<script>
import { onMount } from "svelte";
import Button from "$lib/components/ui/button/button.svelte";
import TimeBox from "$lib/timer/TimeBox.svelte";
let date = $state();
function handleClick() {
  date = new Date();
}
onMount(()=>handleClick())
</script>

<svelte:head>
	<title>Now</title>
</svelte:head>

<div class="flex flex-col w-24 gap-4 p-4">
  
  <Button 
    variant="outline"
    onclick={handleClick}>time</Button>
  
  <TimeBox {date}/>
  <TimeBox {date} fmt="mm:ss"/>
  <TimeBox {date} fmt="dd/MM/y, E"/>
</div>