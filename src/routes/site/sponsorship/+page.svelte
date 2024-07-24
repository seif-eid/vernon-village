<script>
    /** @type {import('./$types').PageData} */
    export let data;

  import SponsorDisplay from "$components/displayPage/SponsorDisplay.svelte";
	import DisplayPageCard from "$components/displayPage/DisplayPageCard.svelte";
</script>
<svelte:head>
  <title>Sponsorships</title>
</svelte:head>

<div class="container">
  <DisplayPageCard contentNamePlural='Sponsors'>
    <div class="grid">
      {#each data.sponsors as sponsor}
        <div class="grid-item">
          <img src={sponsor.image} alt={sponsor.imagedesc} />
          <div class="display-content">
            <div class="content-inner">
              <h3>{sponsor.sponsor}</h3>
              <p>{sponsor.description}</p>
            </div>
          </div>
        </div>
      {/each}
    </div>
  </DisplayPageCard>
</div>

<style>
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
  }
 
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 20px;
    margin-top: 20px;
  }
 
  .grid-item {
    position: relative;
    cursor: pointer;
    overflow: hidden;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s ease-in-out;
  }
 
  .grid-item:hover {
    transform: translateY(-5px);
  }
 
  .grid-item img {
    width: 100%;
    height: auto;
    object-fit: cover;
    display: block;
    transition: transform 0.2s ease-in-out;
  }
 
  .grid-item img:hover {
    transform: scale(1.1);
  }
 
  .display-content {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(255, 255, 255, 0.9);
    padding: 10px;
    transform: translateY(100%);
    transition: transform 0.3s ease-in-out;
    z-index: 1;
    opacity: 0;
  }
 
  .grid-item:hover .display-content {
    transform: translateY(0%);
    opacity: 1;
  }
 
  .content-inner {
    max-height: 200px;
    overflow-y: auto;
  }
 
  .content-inner p {
    margin: 0;
    padding: 5px 0;
  }
 
</style>