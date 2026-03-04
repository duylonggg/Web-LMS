import { ReactNode } from 'react'

export interface LessonItem {
    id: string
    title: string
    description: string
    imageUrl?: string
}

export interface CommunityCardItem {
    id: string
    title: string
    date: string
    likes?: number
    completed?: boolean
}

export interface CongDongTemplateProps {
    title: string
    subtitle: string
    headerImage: string
    backgroundImage?: string
    primaryColor: string
    secondaryColor: string
    accentColor: string
    videoUrl?: string
    lessons: LessonItem[]
    communityCards: CommunityCardItem[]
}

export default function CongDongTemplate({
    title,
    subtitle,
    headerImage,
    backgroundImage,
    primaryColor,
    secondaryColor,
    accentColor,
    videoUrl,
    lessons,
    communityCards,
}: CongDongTemplateProps) {
    return (
        <div className="min-h-screen" style={{ backgroundColor: secondaryColor }}>
            {/* Header Section with Background */}
            <div className="relative overflow-hidden" style={{
                minHeight: '600px',
                backgroundColor: secondaryColor
            }}>
                {/* Background Image */}
                {backgroundImage && (
                    <div
                        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
                        style={{ backgroundImage: `url(${backgroundImage})` }}
                    />
                )}

                {/* Content */}
                <div className="relative z-10 pt-20 pb-8 px-4">
                    <div className="max-w-7xl mx-auto text-center">
                        {/* Curved Title Above Center */}
                        <div className="relative mx-auto mb-8" style={{ width: '700px', height: '180px' }}>
                            {/* Curved Title using SVG */}
                            <svg viewBox="0 0 700 180" className="absolute inset-0 w-full h-full">
                                <defs>
                                    <path id="topCurve" d="M 100,150 Q 350,40 600,150" fill="transparent" />
                                </defs>
                                <text style={{
                                    fill: primaryColor,
                                    fontSize: '62px',
                                    fontWeight: 'bold',
                                    letterSpacing: '0.1em',
                                    textTransform: 'uppercase'
                                }}>
                                    <textPath href="#topCurve" startOffset="50%" textAnchor="middle">
                                        {title}
                                    </textPath>
                                </text>
                            </svg>
                        </div>

                        {/* Search/Info Box */}
                        <div className="relative max-w-4xl mx-auto mt-20">
                            <input
                                type="text"
                                placeholder={subtitle}
                                readOnly
                                className="w-full px-10 py-5 rounded-full text-center text-lg bg-white bg-opacity-75 backdrop-blur-sm border-0 shadow-lg"
                                style={{ color: primaryColor }}
                            />
                        </div>
                    </div>
                </div>

                {/* Double Chevron Down */}
                <div className="absolute bottom-12 left-0 right-0 flex justify-center">
                    <div className="flex flex-col items-center gap-1">
                        <svg
                            className="w-10 h-10"
                            style={{ color: primaryColor }}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            strokeWidth={3}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M19 9l-7 7-7-7"
                            />
                        </svg>
                        <svg
                            className="w-10 h-10 -mt-3"
                            style={{ color: primaryColor }}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            strokeWidth={3}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M19 9l-7 7-7-7"
                            />
                        </svg>
                    </div>
                </div>
            </div>

            {/* Cuộn xuống để tiếp tục đọc */}
            <div className="text-center py-8 text-base" style={{ color: primaryColor }}>
                Cuộn xuống để tiếp tục đọc
            </div>

            {/* Cùng Xem Section - Video */}
            {videoUrl && (
                <div className="max-w-7xl mx-auto px-4 mb-12">
                    <h2
                        className="text-3xl font-bold text-center mb-6"
                        style={{ color: primaryColor }}
                    >
                        CÙNG XEM
                    </h2>
                    <div className="bg-white rounded-3xl p-8 max-w-3xl mx-auto shadow-lg">
                        <div className="aspect-video bg-gray-100 rounded-xl flex items-center justify-center">
                            <div className="text-center">
                                <div className="text-6xl mb-2">📹</div>
                                <p className="text-gray-500">ẢNH<br />VIDEO</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Cùng Đọc Section - Lessons */}
            <div className="max-w-7xl mx-auto px-4 mb-12">
                <h2
                    className="text-3xl font-bold text-center mb-6"
                    style={{ color: primaryColor }}
                >
                    CÙNG ĐỌC
                </h2>
                <div className="bg-white rounded-3xl p-8 max-w-3xl mx-auto shadow-lg">
                    {lessons.map((lesson, index) => (
                        <div key={lesson.id} className="mb-8 last:mb-0">
                            <h3 className="text-center font-semibold mb-4 text-gray-800">
                                {lesson.title}
                            </h3>
                            <div className="flex gap-4 items-center">
                                {/* Left side - Text content */}
                                <div className="flex-1 flex flex-col items-center">
                                    <p className="text-sm text-gray-600 mb-2">Ngữ liệu</p>
                                    <div className="w-full h-1 bg-gradient-to-r" style={{
                                        backgroundImage: `linear-gradient(to right, ${accentColor}, transparent)`
                                    }}></div>
                                </div>

                                {/* Divider */}
                                <div className="flex flex-col items-center h-64">
                                    <div
                                        className="w-1 flex-1"
                                        style={{ backgroundColor: accentColor }}
                                    ></div>
                                    <div
                                        className="w-4 h-4 rounded-full my-2"
                                        style={{ backgroundColor: accentColor }}
                                    ></div>
                                    <div
                                        className="w-1 flex-1 opacity-20"
                                        style={{ backgroundColor: accentColor }}
                                    ></div>
                                </div>

                                {/* Right side - Image */}
                                <div
                                    className="flex-1 rounded-xl flex items-center justify-center h-64"
                                    style={{ backgroundColor: accentColor + '40' }}
                                >
                                    {lesson.imageUrl ? (
                                        <img
                                            src={lesson.imageUrl}
                                            alt={lesson.title}
                                            className="w-full h-full object-cover rounded-xl"
                                        />
                                    ) : (
                                        <p className="text-gray-500 text-sm">ẢNH</p>
                                    )}
                                </div>
                            </div>
                            {lesson.description && (
                                <p className="text-center text-sm text-gray-600 mt-4">
                                    {lesson.description}
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Cộng Đồng Section - Community Cards */}
            <div className="max-w-7xl mx-auto px-4 pb-12">
                <h2
                    className="text-3xl font-bold text-center mb-6"
                    style={{ color: primaryColor }}
                >
                    CỘNG ĐỒNG
                </h2>
                <div className="relative">
                    {/* Navigation arrows */}
                    <button
                        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-50"
                        style={{ color: primaryColor }}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    <div className="overflow-x-auto px-12">
                        <div className="flex gap-4 pb-4">
                            {communityCards.map((card) => (
                                <div
                                    key={card.id}
                                    className="flex-shrink-0 w-64 bg-white rounded-2xl border-2 p-4 shadow-sm hover:shadow-md transition-shadow"
                                    style={{ borderColor: accentColor + '60' }}
                                >
                                    <div className="h-32 bg-gray-100 rounded-xl mb-3 flex items-center justify-center">
                                        <p className="text-xs text-gray-400 text-center px-2">
                                            {card.title}
                                        </p>
                                    </div>
                                    <div className="flex items-center justify-between text-xs text-gray-500">
                                        <span>{card.date}</span>
                                        {card.completed && (
                                            <div
                                                className="w-5 h-5 rounded-full flex items-center justify-center"
                                                style={{ backgroundColor: accentColor }}
                                            >
                                                <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                        )}
                                    </div>
                                    {card.likes !== undefined && (
                                        <div className="mt-2 flex items-center gap-1 text-xs text-gray-500">
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                            </svg>
                                            <span>{card.likes}</span>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    <button
                        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-50"
                        style={{ color: primaryColor }}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    )
}
