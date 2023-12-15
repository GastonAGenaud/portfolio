import { coursesSection } from '@/lib/content/courses';

import { Button, Wrapper } from '@/components';

import { getSectionAnimation } from '@/styles/animations';

const Courses = () => {
  const { subtitle, title, paragraphs, link } = coursesSection;
  return (
    <Wrapper
      id="courses"
      className="max-w-xl mx-auto text-center  !py-16 md:!py-24 mb-20 md:mb-32"
      {...getSectionAnimation}
    >
      <p className="mb-3 font-mono text-sm capitalize text-accent">
        {subtitle}
      </p>
      <h2 className="heading-secondary !mb-5">{title}</h2>

      {paragraphs.map((paragraph, i) => (
        <p key={i}>{paragraph}</p>
      ))}

      <Button type="link" size="lg" href={link} center className="mt-12">
        Comming soon
      </Button>
    </Wrapper>
  );
};

export default Courses;
