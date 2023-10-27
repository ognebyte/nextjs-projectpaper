import Image from 'next/image'
import projectPaper from '@/assets/project-paper.png'

const Header = () => {
    return (
        <header>
            <Image className='img' src={projectPaper} alt='project-paper'/>
        </header>
    );
}

export default Header;
