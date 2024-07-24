<script lang="ts">
	import ContactMessageDisplay from "$lib/components/ContactMessageDisplay.svelte";

    export let data: { messages: any }
</script>
<svelte:head>
  <title>Check Messages</title>
</svelte:head>

<div class="container">
    <h2>Letters to the Administrator</h2>
    <hr>
    {#each data.messages as message}
    <ContactMessageDisplay
        cardBodyId={message._id}
        subject={message.subject}
        message={message.message}
        phone={message.phone}
        email={message.email}
    />
    <br>
    {/each}
</div>