import CongDongTemplate, { LessonItem, CommunityCardItem } from './CongDongTemplate'
import hiepSiXanhImg from '../../img/1x/hiep-si-xanh.png' // Thêm file này vào folder img/1x

const lessons: LessonItem[] = [
    {
        id: 'lesson-1',
        title: 'Tên bài học',
        description: 'Mô tả ngắn về bài học và nội dung chính',
        imageUrl: undefined, // Có thể thêm URL ảnh ở đây
    },
    {
        id: 'lesson-2',
        title: 'Tên bài học',
        description: 'Mô tả ngắn về bài học và nội dung chính',
        imageUrl: undefined,
    },
    {
        id: 'lesson-3',
        title: 'Tên bài học',
        description: 'Mô tả ngắn về bài học và nội dung chính',
        imageUrl: undefined,
    },
]

const communityCards: CommunityCardItem[] = [
    {
        id: 'card-1',
        title: 'NGUYỄN VĂN A - LỚP 11/CHUYÊN ANH',
        date: '15/03/2026',
        completed: true,
    },
    {
        id: 'card-2',
        title: 'NGUYỄN VĂN B - LỚP 10/CHUYÊN ANH',
        date: '14/03/2026',
        completed: true,
    },
    {
        id: 'card-3',
        title: 'TRẦN THỊ C - LỚP 12/CHUYÊN LÝ',
        date: '13/03/2026',
        completed: false,
    },
    {
        id: 'card-4',
        title: 'LÊ VĂN D - LỚP 11/CHUYÊN HÓA',
        date: '12/03/2026',
        completed: true,
    },
    {
        id: 'card-5',
        title: 'PHẠM THỊ E - LỚP 10/CHUYÊN TOÁN',
        date: '11/03/2026',
        completed: false,
    },
    {
        id: 'card-6',
        title: 'HOÀNG VĂN F - LỚP 12/CHUYÊN VĂN',
        date: '10/03/2026',
        completed: true,
    },
    {
        id: 'card-7',
        title: 'NGUYỄN THỊ G - LỚP 11/CHUYÊN SINH',
        date: '09/03/2026',
        completed: false,
    },
    {
        id: 'card-8',
        title: 'TRẦN VĂN H - LỚP 10/CHUYÊN ĐỊA',
        date: '08/03/2026',
        completed: true,
    },
]

export default function HiepSiXanhPage() {
    return (
        <CongDongTemplate
            title="HIỆP SĨ XANH"
            subtitle="Tiêu chí, giới thiệu về cộng đồng hiệp sĩ xanh"
            // headerImage={hiepSiXanhImg}
            backgroundImage={hiepSiXanhImg}
            primaryColor="#1e3a8a" // Navy blue
            secondaryColor="#d9f99d" // Light lime
            accentColor="#84cc16" // Lime green
            videoUrl="https://example.com/video" // URL video nếu có
            lessons={lessons}
            communityCards={communityCards}
        />
    )
}
