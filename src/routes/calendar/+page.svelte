<script>
import {parseDate, parseAbsolute, getLocalTimeZone} from '@internationalized/date';
import * as dfn from "date-fns";
import { 
  toCalendar, 
  calendarDistance } from '$lib/scripts/date-utils';
import Button from "$lib/components/ui/button/button.svelte";
import Input from "$lib/components/ui/input/input.svelte";
import Calendar from "$lib/components/ui/calendar/calendar.svelte";
import Label from "$lib/components/ui/label/label.svelte";
import Checkbox from "$lib/components/ui/checkbox/checkbox.svelte";
import PlusIcon from "@lucide/svelte/icons/plus";
import MinusIcon from "@lucide/svelte/icons/minus";

let days = $state(7);
let calendarDate = $state(toCalendar(new Date()));
let invert = $state(false);
let futureDate = $derived( invert 
  ? toCalendar(dfn.sub(calendarDate.toDate(), {days: days}))
  : toCalendar(dfn.add(calendarDate.toDate(), {days: days}))
)
let pattern = "dd/MM/yy";
let dateFormatted = $derived(dfn.format(calendarDate.toDate(), pattern))

let timeDiff = $derived(invert 
  ? calendarDistance(calendarDate, futureDate)
  : calendarDistance(futureDate, calendarDate)
)
function addDays() { days = days + 1 }
function decreaseDays() { days = days > 0 ? (days-1) : 0}
</script>
<svelte:head>
  <title>Calendar</title>
</svelte:head>
<div class="container">
  <div class="calendar">
    <div class="flex gap-1 w-50 justify-between items-center h-11">
      <Label>{dateFormatted}</Label>
      <Checkbox bind:checked={invert} title="invert"/>
      <Input 
        bind:value={days} 
        class="w-16" 
        type="number"
        min="0"
        max="720"
        />
      <div class="flex w-12">
        <Button
          variant="ghost" 
          onclick={addDays}>
            <PlusIcon/>
        </Button>
        <Button
          variant="ghost" 
          onclick={decreaseDays}>
            <MinusIcon/>
        </Button>
      </div>
    </div>
    <div class="flex items-start w-50 h-44">
      <Calendar
        locale="pt-BR"
        type="single"
        bind:value={calendarDate}
        class="rounded-md border shadow-sm"
      />
    </div>
  </div>
  <div class="calendar">
    <div class="flex w-48 items-center h-11">
      <Label class="w-32">{dfn.format(futureDate.toDate(), pattern)}</Label>
      <Label class="w-32">{timeDiff}</Label>
    </div>
    <div class="flex items-start h-44">
    {#key futureDate}
      <Calendar
        locale="pt-BR"
        type="single"
        bind:value={futureDate}
        class="rounded-md border shadow-sm"
      />
      {/key}
    </div>
  </div>
</div>
<style>
.container {
  padding: 1rem;
  display: grid;
  grid-template-columns: 280px max-content;
}
.calendar {
  display: flex;
  flex-direction: column;
  min-height: 400px;
}
@media screen and (max-width: 640px) {
  .container {
    display: grid;
    grid-template-columns: max-content;
  }
}
</style>