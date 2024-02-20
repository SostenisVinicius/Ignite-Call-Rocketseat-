import { Text, styled } from '@ignite-ui/react'

export const CalendarContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '$6',
  padding: '$6',
})

export const CalendarHeader = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
})

export const CalendarTitle = styled(Text, {
  fontWeight: '$medium',
  textTransform: 'capitalize',
})

export const CalendarActions = styled('div', {
  display: 'flex',
  gap: '$2',
  color: '$gray200',

  button: {
    all: 'unset',
    cursor: 'pointer',
    lineHeight: 0,
    borderRadius: '$sm',

    svg: {
      width: '$5',
      height: '$5',
    },

    '&:hover': {
      color: '$gray100',
    },

    '&:focus': {
      boxShadow: '0 0 0 2px $colors$gray100',
    },
  },
})

export const CalendarBody = styled('table', {
  display: 'grid',
  gridTemplateColumns: 'repeat(7, 1fr)',
  gap: '$2',
  marginTop: '$6',
})

export const CalendarDay = styled('button', {
  all: 'unset',
  width: '$10',
  height: '$10',
  borderRadius: '$sm',
  fontSize: '$sm',
  color: '$gray200',
  fontWeight: '$medium',
  backgroundColor: '$gray600',

  '&:disabled': {
    background: 'none',
    cursor: 'default',
    opacity: 0.4,
  },

  '&:not(:disabled):hover': {
    background: '$gray500',
  },

  '&:focus': {
    boxShadow: '0 0 0 2px $colors$gray100',
  },

  '&:first-of-type': {
    borderTopLeftRadius: '$sm',
  },

  '&:last-of-type': {
    borderTopRightRadius: '$sm',
  },

  variants: {
    isCurrent: {
      true: {
        color: '$gray100',
        fontWeight: '$bold',
      },
    },
  },
})
