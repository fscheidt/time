<script>
import Button from "$lib/components/ui/button/button.svelte";
import TimeBox from "$lib/timer/TimeBox.svelte";
let date = $state();
function handleClick() {
  date = new Date();
}
</script>

<div class="flex flex-col w-24 gap-4 p-4">
  
  <h1>Timer</h1>
  <Button 
    variant="outline"
    onclick={handleClick}>Now</Button>
  
  <TimeBox {date}/>
  
</div>