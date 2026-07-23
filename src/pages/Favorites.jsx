import { Link } from 'react-router-dom'
import { useFavoritesStore } from '../store/favoritesStore'
import { tools } from '../data/tools'
import EmptyState from '../components/ui/EmptyState'
import Button from '../components/ui/Button'
import ToolCard from '../components/ui/ToolCard'

export default function Favorites() {
  const favorites = useFavoritesStore((state) => state.favorites)
  const favoriteTools = tools.filter((tool) => favorites.includes(tool.id))
  return <div className="dt-page"><div className="mb-8"><div className="dt-eyebrow mb-3">Personal shelf / {favoriteTools.length}</div><h1 className="dt-page-heading">Favorites</h1><p className="dt-page-copy mt-3">Your fastest route back to trusted instruments.</p></div>{favoriteTools.length === 0 ? <div className="dt-panel dt-hard-shadow"><EmptyState icon="Star" title="No favorites yet" description="Star any tool to pin it here for quick access." action={<Link to="/all"><Button>Explore tools</Button></Link>} /></div> : <div className="dt-tool-grid">{favoriteTools.map((tool) => <ToolCard key={tool.id} tool={tool} />)}</div>}</div>
}
