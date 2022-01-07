/*
 * Movie Messages
 *
 * This contains all the text for the Movie component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.Movie';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the Movie component!',
  },
});
