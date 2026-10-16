import { Component } from '@angular/core';

/** Placeholder copy. Swap the text, services and photo (public/images) for the real thing. */
const SERVICES = [
  'Creative direction',
  'Production',
  'Branding',
  'Web development',
  'Social media',
  'Consulting',
];

@Component({
  selector: 'app-about',
  template: `
    <main class="about">
      <section class="about__text">
        <h1 class="about__title">
          Hello there<span class="about__dot" aria-hidden="true"></span><br />
          we&rsquo;re <span class="about__accent">Sphere</span>
        </h1>

        <div class="serif about__copy">
          <p>
            SPHERE is a digital agency built around creators. Our work blends culture, fashion,
            music and lifestyle into stories that feel current and honest.
          </p>
          <p>
            What defines us is the way we approach each project: with precision, with vision, and
            with the belief that every brand deserves its own identity. That&rsquo;s the energy we
            bring to every project.
          </p>
        </div>

        <div class="about__services">
          <h2 class="pill about__label">Services</h2>
          <ul>
            @for (service of services; track service) {
              <li>{{ service }}</li>
            }
          </ul>
        </div>
      </section>

      <figure class="about__media">
        <img src="images/photo-07.jpg" alt="" />
      </figure>
    </main>
  `,
})
export class About {
  protected readonly services = SERVICES;
}
