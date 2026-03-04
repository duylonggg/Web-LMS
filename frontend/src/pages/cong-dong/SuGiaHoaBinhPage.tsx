import CongDongTemplate, { LessonItem, CommunityCardItem } from './CongDongTemplate'
import suGiaHoaBinhImg from '../../img/1x/su-gia-hoa-binh.png'
// import suGiaHoaBinhBg from '../../img/1x/su-gia-hoa-binh-bg.png' // Thêm file này vào folder img/1x

const lessons: LessonItem[] = [
    {
        id: 'lesson-1',
        title: 'Tên bài học',
        description: 'Mô tả ngắn về bài học hòa bình và hòa giải',
        imageUrl: undefined, // Có thể thêm URL ảnh ở đây
    },
    {
        id: 'lesson-2',
        title: 'Tên bài học',
        description: 'Mô tả ngắn về bài học hòa bình và hòa giải',
        imageUrl: undefined,
    },
    {
        id: 'lesson-3',
        title: 'Tên bài học',
        description: 'Mô tả ngắn về bài học hòa bình và hòa giải',
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

export default function SuGiaHoaBinhPage() {
    return (
        <CongDongTemplate
            title="SỨ GIẢ HÒA BÌNH & HÒA GIẢI"
            subtitle="Tiêu chí, giới thiệu về cộng đồng sứ giả hòa bình"
            headerImage={suGiaHoaBinhImg}
            // backgroundImage={suGiaHoaBinhBg} // Uncomment khi đã thêm file su-gia-hoa-binh-bg.png
            primaryColor="#1e3a8a" // Navy blue
            secondaryColor="#bae6fd" // Light cyan/blue
            accentColor="#0ea5e9" // Sky blue
            videoUrl="https://example.com/video" // URL video nếu có
            lessons={lessons}
            communityCards={communityCards}
        />
    )
}
