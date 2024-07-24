<script>
    /** @type {import('./$types').PageData} */
    export let data;

  import HomeBusinessDisplay from "$components/displayPage/HomeBusinessDisplay.svelte";
	import DisplayPageCard from "$components/displayPage/DisplayPageCard.svelte";
</script>
<svelte:head>
  <title>Local Businesses</title>
</svelte:head>
<svelte:body class="bg-light bg-gradient"/>
<style>
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
  }
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); /* Responsive grid */
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
    height: auto; /* Maintain aspect ratio */
    object-fit: cover;
    display: block; /* Prevents extra space below image */
    transition: transform 0.2s ease-in-out;
  }
  .grid-item img:hover {
    transform: scale(1.1); /* Zoom effect on hover */
  }
  .display-content {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(255, 255, 255, 0.9); /* Semi-transparent white background */
    padding: 10px;
    transform: translateY(100%);
    transition: transform 0.3s ease-in-out;
    z-index: 1; /* Ensure it's above other content */
    opacity: 0; /* Initially hidden */
  }
  .grid-item:hover .display-content {
    transform: translateY(0%);
    opacity: 1; /* Show on hover */
  }
  .content-inner {
    max-height: 200px; /* Adjust max height as needed */
    overflow-y: auto; /* Enable scrolling if content exceeds max height */
  }
  .content-inner p {
    margin: 0;
    padding: 5px 0;
  }
  .contact-info {
    margin-top: 10px;
  }
  .contact-info a {
    color: #007bff;
    text-decoration: none;
  }
</style>
<div class="container">
  <DisplayPageCard contentNamePlural='Home Businesses'>
    <div class="grid">
      {#if data.businesses && data.businesses.length > 0}
        {#each data.businesses as business}
          <div class="grid-item">
            <img src={business.image} alt={business.imagedesc} />
            <div class="display-content">
              <div class="content-inner">
                <h3>{business.business}</h3>
                <p>{business.description}</p>
                <div class="contact-info">
                  <strong>Contact Info:</strong><br />
                  {#if business.link}
                    <a href={business.link}>{business.link}</a><br />
                  {/if}
                  {#if business.phone}
                    Phone: {business.phone}<br />
                  {/if}
                  {#if business.email}
                    Email: <a href={`mailto:${business.email}`}>{business.email}</a><br />
                  {/if}
                </div>
              </div>
            </div>
          </div>
        {/each}
      {:else}
        <p>No local businesses are available.</p>
      {/if}
    </div>
  </DisplayPageCard>
</div>
