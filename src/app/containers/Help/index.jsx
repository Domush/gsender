import React from 'react';
import ToolModal from 'app/components/ToolModal/ToolModal';
import HelpCard from 'app/containers/Help/HelpCard';
import styles from './index.styl';


const REPORT_FORM_LINK = 'https://sienci.com/gsender-feedback/';
const DOCUMENTATION_LINK = 'https://resources.sienci.com/view/gs-using-gsender/';
const FORUM_LINK = 'https://forum.sienci.com/c/gsender/14';

const HelpModal = ({ modalClose }) => {
    return (
        <ToolModal
            onClose={modalClose}
            title="gSender Help"
        >
            <div className={styles.helpWrapper}>
                <div className={styles.helpModal}>
                    <HelpCard
                        link={REPORT_FORM_LINK}
                        title="Feedback"
                        text="Submit bugs or feedback about the current version of gSender."
                        linkText="Help us improve"
                        icon="fa-bug"
                    />
                    <HelpCard
                        link={DOCUMENTATION_LINK}
                        title="Documentation"
                        text="Learn about starting with gSender and how to use specific features."
                        linkText="Explore"
                        icon="fa-book"
                    />
                    <HelpCard
                        link={FORUM_LINK}
                        title="Community"
                        text="Our forums are a great place to go to have continued conversations with our friendly and helpful community."
                        linkText="Engage"
                        icon="fa-comments"
                    />
                </div>
            </div>
        </ToolModal>
    );
};

export default HelpModal;
