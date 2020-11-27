from django.db import models
from datetime import datetime
from django.template.defaultfilters import slugify

class Categories(models.TextChoices):
  Python = 'python'
  Go = 'go'
  React = 'react'
  JavaScript = 'javascript'
  Git = 'git'
  AWS = 'aws'
  Business = 'business'
  Book = 'book'

class BlogPost(models.Model):
  title = models.CharField(max_length=50)
  slug = models.SlugField()
  category = models.CharField(max_length=50, choices=Categories.choices, default=Categories.Python)
  thumbnail = models.ImageField(upload_to='photos/%Y/%m/%d/')
  excerpt = models.CharField(max_length=150)
  year = models.CharField(max_length=4, default='20')
  month = models.CharField(max_length=3)
  day = models.CharField(max_length=2)
  content = models.TextField()
  date_created = models.DateTimeField(default=datetime.now, blank=True)

  def save(self, *args, **kwargs):
    original_slug = slugify(self.title)
    queryset = BlogPost.objects.all().filter(slug__iexact=original_slug).count()

    count = 1
    slug = original_slug
    while(queryset):
      slug = original_slug + '-' + str(count)
      count += 1
      queryset = BlogPost.objects.all().filter(slug__iexact=slug).count()
    
    self.slug = slug

    super(BlogPost, self).save(*args, **kwargs)

  def __str__(self):
      return self.title  