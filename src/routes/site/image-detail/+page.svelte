<script>
  import { selectedImage } from "../../../imageStore.js";
  import { onMount } from "svelte";

  let imageInfo = {
    imageFilename: "",
    imageDesc: "",
    imageDetailDesc: "",
    imageEndDate: "",
    imageContactInfo: "",
  };

  onMount(() => {
    // Subscribe to changes in the selectedImage store
    selectedImage.subscribe((value) => {
      imageInfo = value;
    });
  });
</script>

<title>Image Details</title>
<div class="detail-container">
  <h1>Image detail</h1>
  <div class="img">
    <img src={imageInfo.imageFilename} alt={imageInfo.imageDesc} />
  </div>
  <div class="txt">
    <h2>{imageInfo.imageDesc}</h2>
    <p>{imageInfo.imageDetailDesc}</p>
    {#if imageInfo.imageEndDate !== ""}
      <p>Ends on: {imageInfo.imageEndDate}</p>
    {/if}
    <p>
      Contact Info: <a href="mailto:{imageInfo.imageContactInfo}"
        >{imageInfo.imageContactInfo}</a
      >
    </p>
  </div>
</div>

<style>
  .detail-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .img {
    width: 400px; /* Adjust the width as needed */
    margin-bottom: 20px;
    background-color: #f0f0f0; /* Light gray background */
    border-radius: 10px;
    overflow: hidden;
    position: relative;
  }

  .img img {
    width: 100%;
    height: auto;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .txt {
    max-width: 400px;
    background-color: #f9f9f9; /* Slightly darker gray background */
    padding: 20px;
    border-radius: 10px;
  }

  h1 {
    font-size: 24px;
    margin-bottom: 10px;
  }

  h2 {
    font-size: 20px;
    margin-bottom: 10px;
  }

  p {
    font-size: 16px;
    margin-bottom: 10px;
  }

  a {
    color: #007bff;
    text-decoration: none;
    transition: color 0.2s ease-in-out;
  }

  a:hover {
    color: #0056b3;
  }
</style>
