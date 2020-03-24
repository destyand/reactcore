import { faHome, faBriefcase, faPaperPlane, faQuestion, faImage, faCopy } from '@fortawesome/free-solid-svg-icons';

export default {
  items: [
    {
      name: 'Home',
      url: '/home',
      icon: faHome,
      navigation_header: [
        { name: 'EXAMPLE' }
      ]
    },
    {
      name: 'Example Component',
      url: '/',
      icon: faBriefcase,
      children: [
        {
          name: 'Example 1-1',
          url: '/example1',
          icon: faPaperPlane,
        },
        {
          name: 'Example 2-1',
          url: '/example2',
          icon: faQuestion,
        },
      ],
    },
    {
      name: 'Master Component',
      url: '/',
      icon: faBriefcase,
      navigation_header: [
        { name: 'MASTER' }
      ],
      children: [
        {
          name: 'Master Route',
          url: '/master_route',
          icon: faPaperPlane,
        },
      ],
    },
  ],
};
