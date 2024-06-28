export default function Button({ prop }: any) {
    var color = ['bg-blue-600', 'bg-red-600', 'bg-blue-800', 'bg-gray-700', 'bg-green-600', 'bg-green-800 ', 'bg-zinc-600', 'bg-zinc-800']
    return (
        <button className={`p-2 text-gray-50 rounded hover:${color[prop.hover]}  ${color[prop.color]}`}>
            {prop.text}
        </button>
    )
}