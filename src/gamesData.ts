export interface Game {
  id: string
  name: string
  image: string
  description: string
  highlights: string[]
  tagline: string
}

export const games: Game[] = [
  {
    id: 'bouncing-castles',
    name: 'Bouncing Castles',
    image: '/games/Bouncing Castles.png',
    description: 'Colorful inflatables that turn any event into a high-energy play zone.',
    tagline: 'Bounce into the fun — the ultimate crowd-pleaser for kids and adults alike.',
    highlights: ['Safe & supervised setup', 'Suitable for all ages', 'Indoor & outdoor use', 'Full delivery & collection'],
  },
  {
    id: 'canvas-painting',
    name: 'Canvas Painting',
    image: '/games/Canvas Painting.png',
    description: 'A creative station for kids and adults to paint, relax, and take home art.',
    tagline: 'Unleash creativity — every guest leaves with a masterpiece they made themselves.',
    highlights: ['All materials provided', 'Guided or free-style sessions', 'Perfect for all ages', 'Take-home keepsake'],
  },
  {
    id: 'carrom-board',
    name: 'Carrom Board',
    image: '/games/Carrom Board.png',
    description: 'A classic tabletop strike-and-pocket game that\'s fun for all ages.',
    tagline: 'Flick, aim, and pocket — a timeless game that brings people together.',
    highlights: ['Classic tabletop gameplay', 'Competitive & casual modes', 'Great for all ages', 'Multiple boards available'],
  },
  {
    id: 'chess-boards',
    name: 'Chess Boards',
    image: '/games/Chess Boards.png',
    description: 'Strategic and competitive — perfect for calm corners and tournaments.',
    tagline: 'Think ahead, play smart — chess adds a touch of class to any event.',
    highlights: ['Standard & giant sets', 'Tournament-ready setup', 'Great for quiet zones', 'All skill levels welcome'],
  },
  {
    id: 'clowns-mascots',
    name: 'Clowns & Mascots',
    image: '/games/Clowns Mascots .png',
    description: 'Live characters that bring laughter, photos, and unforgettable moments.',
    tagline: 'Big smiles, bigger memories — live entertainment that steals the show.',
    highlights: ['Professional performers', 'Custom character options', 'Photo-ready moments', 'Kids love them'],
  },
  {
    id: 'cornhole',
    name: 'Cornhole',
    image: '/games/Cornhole.png',
    description: 'An easy-to-learn outdoor tossing game — great for teams and friendly rivalry.',
    tagline: 'Toss, score, repeat — the perfect game for friendly competition at any event.',
    highlights: ['Easy to learn', 'Team or solo play', 'Outdoor & indoor use', 'Custom boards available'],
  },
  {
    id: 'darts-board',
    name: 'Darts Board',
    image: '/games/Darts Board.png',
    description: 'A crowd-pleaser for casual play or competitive score challenges.',
    tagline: 'Aim true, score big — darts keeps the energy going all event long.',
    highlights: ['Safe soft-tip darts', 'Casual & competitive play', 'Easy setup anywhere', 'All ages welcome'],
  },
  {
    id: 'face-painting',
    name: 'Face Painting',
    image: '/games/Face painting.png',
    description: 'Professional face painting to match themes, characters, and celebrations.',
    tagline: 'Transform your guests — professional face art that brings themes to life.',
    highlights: ['Professional artists', 'Theme-matched designs', 'Safe skin-friendly paints', 'Kids & adults'],
  },
  {
    id: 'giant-connect-4',
    name: 'Giant Connect 4',
    image: '/games/Giant Connect 4.png',
    description: 'Supersized strategy fun — connect four in a row before your opponent.',
    tagline: 'Go big or go home — giant Connect 4 is strategy fun at event scale.',
    highlights: ['Oversized game pieces', 'Quick & exciting rounds', 'Great for all ages', 'Crowd-gathering game'],
  },
  {
    id: 'giant-jenga',
    name: 'Giant Jenga',
    image: '/games/Giant Jenga.png',
    description: 'Build, pull, and balance — a tense, hilarious crowd game for all events.',
    tagline: 'Pull carefully, laugh loudly — Giant Jenga is the ultimate crowd magnet.',
    highlights: ['Oversized wooden blocks', 'Builds suspense & laughter', 'Indoor & outdoor use', 'All ages welcome'],
  },
  {
    id: 'ludo-boards',
    name: 'Ludo Boards',
    image: '/games/Ludo Boards.png',
    description: 'A family favorite board game that keeps groups laughing and competing.',
    tagline: 'Roll the dice, race to win — Ludo brings out the competitive spirit in everyone.',
    highlights: ['Classic board game', 'Up to 4 players per board', 'Multiple boards available', 'Great for families'],
  },
  {
    id: 'mini-golf',
    name: 'Mini Golf Sets',
    image: '/games/Mini Golf Sets.png',
    description: 'Create a mini course anywhere — perfect for fun days and relaxed play.',
    tagline: 'Putt your way to fun — mini golf adds a resort feel to any event.',
    highlights: ['Portable course setup', 'Customisable layouts', 'All ages welcome', 'Indoor & outdoor'],
  },
  {
    id: 'mini-golf-deluxe',
    name: 'Mini Golf Sets (Deluxe)',
    image: '/games/Mini Golf Sets1.png',
    description: 'An expanded mini golf setup with extra obstacles for bigger spaces.',
    tagline: 'More holes, more fun — the deluxe course is a full event experience on its own.',
    highlights: ['Extended course layout', 'Extra obstacles & features', 'Perfect for large venues', 'Premium experience'],
  },
  {
    id: 'omweso',
    name: 'Omweso',
    image: '/games/Omweso.png',
    description: 'A traditional strategy game that\'s engaging, cultural, and competitive.',
    tagline: 'Rooted in tradition, alive with strategy — Omweso is culture meets competition.',
    highlights: ['Traditional African game', 'Deep strategic gameplay', 'Cultural conversation starter', 'All ages'],
  },
  {
    id: 'playstation-sets',
    name: 'PlayStation Sets',
    image: '/games/Playstation Sets.png',
    description: 'Console gaming stations for tournaments, chill zones, and retro vibes.',
    tagline: 'Level up your event — PlayStation stations bring the ultimate gaming energy.',
    highlights: ['Latest & retro titles', 'Tournament-ready setup', 'Multiple stations available', 'All ages'],
  },
  {
    id: 'ring-toss',
    name: 'Ring Toss',
    image: '/games/Ringtoss.png',
    description: 'Simple, addictive skill game — ideal for outdoor and indoor setups.',
    tagline: 'Simple to play, impossible to put down — ring toss keeps guests hooked.',
    highlights: ['Easy to learn', 'Competitive & casual', 'Indoor & outdoor', 'Great for all ages'],
  },
  {
    id: 'table-tennis',
    name: 'Table Tennis',
    image: '/games/Table Tennis.png',
    description: 'Fast-paced rallies and mini competitions — great for teens and adults.',
    tagline: 'Serve, rally, win — table tennis brings fast-paced energy to any event.',
    highlights: ['Full-size tables', 'Competitive & casual play', 'Paddles & balls included', 'Teens & adults'],
  },
  {
    id: 'tic-tac-toe',
    name: 'Tic Tac Toe',
    image: '/games/TicTacToe.png',
    description: 'A quick-play classic that works perfectly as a walk-up game station.',
    tagline: 'X marks the fun — a walk-up classic that never gets old.',
    highlights: ['Instant play, no setup', 'Giant & standard versions', 'Great filler game', 'All ages'],
  },
  {
    id: 'trampolines',
    name: 'Trampolines',
    image: '/games/Trampolines.png',
    description: 'Safe, supervised bouncing fun that adds energy to outdoor events.',
    tagline: 'Jump into the excitement — trampolines bring pure joy to every outdoor event.',
    highlights: ['Safety-certified equipment', 'Supervised at all times', 'Outdoor use', 'Kids & teens'],
  },
  {
    id: 'virtual-reality',
    name: 'Virtual Reality Set',
    image: '/games/Virtual Reality set.png',
    description: 'Immersive VR experiences that wow guests and create instant buzz.',
    tagline: 'Step into another world — VR is the wow factor your event has been waiting for.',
    highlights: ['Latest VR headsets', 'Multiple experiences available', 'Instant crowd magnet', 'Teens & adults'],
  },
]

export function getGameById(id: string): Game | undefined {
  return games.find((g) => g.id === id)
}
