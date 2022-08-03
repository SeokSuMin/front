import { Drawer, Tag } from 'antd';
import XToggle from '../public/x-Toggle.svg';

interface ICategorisDrawerProps {
    visible: boolean;
    closeDrawer: () => void;
    categoris: { name: string; isActive: boolean }[];
    openCategori: (name: string, isActive: boolean) => void;
}

const CategorisDrawer = ({ visible, closeDrawer, categoris, openCategori }: ICategorisDrawerProps) => {
    return (
        <Drawer
            title={`Categoris`}
            placement="left"
            closable={false}
            visible={visible}
            onClose={closeDrawer}
            style={{ top: 60 }}
        >
            {categoris.map((categori, i) => {
                return (
                    <div key={categori.name} style={{ textAlign: 'center', cursor: 'pointer' }}>
                        <Tag
                            onClick={() => openCategori(categori.name, categori.isActive)}
                            color={categori.isActive ? '#108ee9' : ''}
                            style={{ marginBottom: 5 }}
                            key={i}
                        >
                            {categori.name}
                        </Tag>
                    </div>
                );
            })}
        </Drawer>
    );
};

export default CategorisDrawer;
