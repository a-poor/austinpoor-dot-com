---
isDraft: false
title: Algorithmic Color Palettes
subtitle: Using Machine Learning to Generate Color Palettes from Images
description: Using Unsupervised Machine Learning algorithms to generate color palettes from film stills.
image:
    src: /images/color-palette-example.webp
    alt: A photo of mountains with a color palette generated from the image.
    caption: Photo by Trey Ratcliff (Source) with my generated color palette.
    captionLink: https://flickr.com/photos/stuckincustoms/8837173497
publishDate: "2020-10-13"
# updateDate: "2023-02-16"
tags:
- data-science
- machine-learning
- clustering
- color-theory
- image-processing
recommended:
- predict-spotify-skips
- big-query-data-augmentation
---

I was recently working on a project in which I wanted to be able to compare the look and feel of images which led me to look for a way to create color palettes using machine learning.

Generating a color palette can be thought of as a clustering problem in disguise. We want to partition all of an image's pixels into k different groups that best represent the image.

![Image of RGB Color Space (https://en.wikipedia.org/wiki/File:RGB_Cube_Show_lowgamma_cutout_b.png)](/images/rbg-color-space.webp)
*[Source Wikipedia](https://en.wikipedia.org/wiki/File:RGB_Cube_Show_lowgamma_cutout_b.png)*

Instead of viewing our image as a grid of pixels — each with a red, green, and blue value — we can think of it as an array of points plotted in [3D color-space](https://en.wikipedia.org/wiki/RGB_color_space). There's a dimension for red, a dimension for green, and a dimension for blue and a point can sit anywhere between `0` and `255` in each dimension.

Let's say we're looking to create a palette of 8 colors to represent each image. That means we want to find 8 clusters or partitions that can give us the best possible representation of each image.

There are many different clustering algorithms to choose from — each with their own pros and cons — but for the purposes of this project I tried both [K-Means clustering](https://en.wikipedia.org/wiki/K-means_clustering) and [Agglomerative clustering](https://en.wikipedia.org/wiki/Hierarchical_clustering#Agglomerative_clustering_example).

I picked 5 sample stills from the film [Only God Forgives (2013)](https://en.wikipedia.org/wiki/Only_God_Forgives) (using the site [FILMGRAB](http://film-grab.com/)) because of its rich palettes.

![Still from Only God Forgives (2013) with k-means generated palette](/images/palette-only-god-forgives-k-means-1.webp)
*Still from Only God Forgives (2013), courtesy of FILMGRAB, with k-means generated palette.*

Above is an example film still and the color palette generated using K-Means. As you can see, the algorithm does a fairly good job of making a nice representative palette without much hyper-parameter tuning. Additionally, it allows you to specify a color palette size — which some other clustering algorithms don't (DBSCAN, for example).

You can see more examples of generated palettes in my [notebook](https://nbviewer.jupyter.org/github/a-poor/color-palettes/blob/main/color-palettes.ipynb#).

## Algorithmic Challenges

As it turns out, algorithms like K-Means favor high-volume colors over sparse-but-prominent colors. For example, see the below still.

![Still from Only God Forgives (2013) with k-means generated palette](/images/palette-only-god-forgives-k-means-2.webp)
*Still from Only God Forgives (2013), courtesy of FILMGRAB, with k-means generated palette.*

The K-Means palette gets a good approximation of a majority of the colors, but looking at the image, you might expect it to include some blue (such as on the mat or the shorts of the downed boxer) or red (such as on the ropes , or the standing boxer's gloves/attire/etc).

Thinking back to how K-Means works, the algorithm tries to partition the colors in the image into *k* groups — represented by *k* average points in color-space. In this case, there isn't enough blue or red in the image to be picked up by the algorithm so they're getting washed out by the other similar, more abundant colors.

In order to work around this, there are a few things we could try.

![Still from Only God Forgives (2013) with k-means and agglomerative generated palettes.](/images/palette-only-god-forgives-k-means-vs-agglomerative.webp)
*Still from Only God Forgives (2013), courtesy of FILMGRAB, with k-means and agglomerative generated palettes.*

The above image shows palettes generated using both K-Means and Agglomerative clustering. Agglomerative clustering chose to include a blue in the palette, though it lost the muted yellow and still didn't include any red.

![Still from Only God Forgives (2013) with k-means generated palettes using RGB and HSV colors](/images/palette-only-god-forgives-k-means-rgb-vs-hsv.webp)
*Still from Only God Forgives (2013), courtesy of FILMGRAB, with k-means generated palettes using RGB and HSV colors.*

Another approach is to convert the image's colors from RGB to HSV. RGB represents a color as a combination of the intensities of the red, green, and blue channels while HSV represents a color as the hue (the spectrum of base colors), saturation (the intensity of a color), and value (the relative lightness or darkness of a color) — which you can read more about [here](https://en.wikipedia.org/wiki/HSL_and_HSV). The above image shows palettes generated for the same image using K-Means clustering with RGB colors and HSV colors. As you can see, the HSV approach includes both the blue and the yellow (though still no red).

In order to further improve the results, some options include combining techniques (i.e. Agglomerative clustering + HSV colors), hyper-parameter tuning, using different algorithms (e.g. DBSCAN), and adjusting the color distance metric (If you're interested, you can read more about color differences [here](https://en.wikipedia.org/wiki/Color_difference)).

## Flask App

As a final bonus, I decided to create a simple proof-of-concept API for generating color palettes from images. The API takes an image URL as a parameter and will use K-Means to generate a palette.

Additionally, I found that the website [Coolors](https://coolors.co/) makes it easy to create a color palette URL, so the API can return the color palette as a 2D array of colors or as a URL to a Coolors palette.

For example, using this image…

![Film still from Only God Forgives (2013)](/images/palettes-only-god-forgives-no-palette.webp)
*Only God Forgives (2013), courtesy of FILMGRAB*

...the API would produce the following link: https://coolors.co/3c030b-050002-3967cd-152f63-760102-7e504c-110c33-b4d1df

Viewed together, you would get...

![Still from Only God Forgives (2013) with k-means generated palette courtesy of Coolors](/images/palettes-only-god-forgives-with-generated-palette.webp)
*Still from Only God Forgives (2013), courtesy of FILMGRAB, with k-means generated palette courtesy of Coolors.*

You can check out the Flask app in my GitHub repo, [here](https://github.com/a-poor/color-palettes).

## Conclusion

This was a short but fun side-project and there's definitely a lot more to explore here. Definitely check out [FILMGRAB](https://film-grab.com/) and [Coolors](https://coolors.co/) if you think you might be interested.

You can find my code on [GitHub](https://github.com/a-poor/color-palettes) or check out the notebook with [nbviewer](https://nbviewer.jupyter.org/github/a-poor/color-palettes/blob/main/color-palettes.ipynb#) or [Binder](https://mybinder.org/v2/gh/a-poor/color-palettes/main?filepath=color-palettes.ipynb).

