import { Link } from 'react-router-dom'
import hiepSiXanhImg from '../../img/1x/hiep-si-xanh.png'
import suGiaHoaBinhImg from '../../img/1x/su-gia-hoa-binh.png'

const communities = [
    {
        id: 'su-gia-hoa-binh',
        title: 'SỨ GIẢ\nHÒA BÌNH\n& HÒA GIẢI',
        image: suGiaHoaBinhImg,
        icon: '🕊️',
        bgColor: '#bae6fd',
        borderColor: '#0ea5e9',
        path: '/cong-dong/su-gia-hoa-binh',
    },
    {
        id: 'hiep-si-xanh',
        title: 'HIỆP SĨ\nXANH',
        image: hiepSiXanhImg,
        icon: '🛡️',
        bgColor: '#d9f99d',
        borderColor: '#84cc16',
        path: '/cong-dong/hiep-si-xanh',
    },
]

export default function CongDongTrachNhiemPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-300 via-blue-400 to-blue-500 flex flex-col items-center justify-center px-4 py-12">
            {/* Header */}
            <div className="mb-16">
                <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-full px-12 py-5 shadow-xl border-4 border-blue-700">
                    <h1 className="text-4xl font-bold text-blue-900 tracking-wide">
                        CỘNG ĐỒNG TRÁCH NHIỆM
                    </h1>
                </div>
            </div>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl w-full">
                {communities.map((community) => (
                    <Link
                        key={community.id}
                        to={community.path}
                        className="group"
                    >
                        <div
                            className="rounded-3xl p-8 shadow-2xl border-4 transition-all duration-300 hover:scale-105 hover:shadow-3xl cursor-pointer"
                            style={{
                                backgroundColor: community.bgColor,
                                borderColor: community.borderColor,
                            }}
                        >
                            <div className="flex flex-col items-center justify-center h-80">
                                {/* Icon/Image */}
                                <div className="mb-8">
                                    <img
                                        src={community.image}
                                        alt={community.title}
                                        className="w-40 h-40 object-contain filter drop-shadow-lg"
                                    />
                                </div>

                                {/* Title */}
                                <h2
                                    className="text-3xl font-bold text-center leading-tight whitespace-pre-line"
                                    style={{ color: '#1e3a8a' }}
                                >
                                    {community.title}
                                </h2>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Footer Note */}
            <div className="mt-12 text-center">
                <p className="text-white text-lg font-medium opacity-90">
                    Chọn một cộng đồng để khám phá các hoạt động và bài học
                </p>
            </div>
        </div>
    )
}
