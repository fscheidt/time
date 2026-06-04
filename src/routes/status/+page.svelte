<script>
import { App } from '$lib/index';
import * as Card from "$lib/components/ui/card/index.js";
let status = App.status();
let device = $state(status.device);
</script>
<svelte:window 
  bind:innerWidth={device.width}
  bind:innerHeight={device.height}
></svelte:window>

<svelte:head>
  <title>Status</title>
</svelte:head>

{#snippet json(item)}
  <div class="flex w-full p-4">
    <Card.Root class="w-120 max-w-240 m-0">
      <Card.Header>
        <Card.Title class="h-2">{ item?.title }</Card.Title>
      </Card.Header>
      <Card.Content>
        <pre>{ JSON.stringify(item.data, null, 2) }</pre>
      </Card.Content>    
    </Card.Root>
  </div>
{/snippet}

<div class="status p-2">
  {@render json({ title:"device", data: device })}
  {@render json({ title:"app", data: status.app })}  
</div>
