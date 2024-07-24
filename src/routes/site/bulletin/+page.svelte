<script lang="ts">
  import { goto } from "$app/navigation";
  import { selectedImage } from "../../../imageStore";
  import type { PageData } from "./$types";
  export let data: PageData;
  $: ({ bulletinPost } = data);

  function viewImageDetail(image: any) {
    selectedImage.set(image); // Set the selected image details in the store
    goto("/site/image-detail");
  }
</script>

<title>Bulletin Board</title>
<div class="grid">
  {#each bulletinPost as bp}
    <div class="grid-item">
      <!-- svelte-ignore a11y-no-noninteractive-tabindex -->
      <img
        tabindex="0"
        src={bp.content.image}
        alt={bp.content.imagedesc}
        on:click={() =>
          viewImageDetail({
            imageFilename: bp.content.image,
            imageDesc: bp.content.imagedesc,
            imageDetailDesc: bp.content.description,
            imageEndDate: bp.content.expiryDate,
            imageContactInfo: bp.content.email,
          })}
        on:keypress={(event) => {
          if (event.key == "Enter") {
            viewImageDetail({
              imageFilename: bp.content.image,
              imageDesc: bp.content.imagedesc,
              imageDetailDesc: bp.content.description,
              imageEndDate: bp.content.expiryDate,
              imageContactInfo: bp.content.email,
            });
          }
        }}
      />
    </div>
  {/each}
</div>

<!-- <div class="submitpost">
  <button class="btn btn-primary" on:click={() => goto("/site/submit")}>
    Submit Post!
  </button>
</div> -->

<style>
  .grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    margin: 20px;
  }

  .grid-item {
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s ease-in-out;
    padding-bottom: 100%; /* Create a square space */
    position: relative;
  }

  .grid-item:hover {
    transform: translateY(-5px);
  }

  .grid-item img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    cursor: pointer;
  }

  .submitpost {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }

  .btn {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    background-color: #007bff;
    color: white;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;
  }

  .btn:hover {
    background-color: #0056b3;
  }
</style>
